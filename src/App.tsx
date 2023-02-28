import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Contract } from 'ethers';
import { fetchSigner } from '@wagmi/core';
import encHex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import notaryShotContract from 'contracts/screenshot-manager.json';
import { UrlForm, Header, ScreenshotPreview } from 'components';
import { getPreviewMetadata, convertImageSize, getOffset } from 'utils';
import { UrlForm, Header, ScreenshotPreview } from 'components';
import classes from 'App.module.scss';
import { getPreviewMetadata, getStampedImagePreviewDataUrl } from 'utils';

const PREVIEW_IMG_DEFAULT_WIDTH = 500;
const WATERMARK_URL = 'stamp.png';

function App() {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [requested, setRequested] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [stampedScreenshot, setStampedScreenshot] = useState<string | null>(null);
  const [requestUrl, setRequestUtl] = useState<string | null>(null);
  const [hashCheckSum, setHashCheckSum] = useState<string | null>(null);
  const [notorizeTxResult, setNotorizeTxResult] = useState<{
    status: 'confirmed' | 'error';
    gasUsed: BigInt | null;
    error: string | null;
  } | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [stampedScreenshotUrl, setStampedScreenshotUrl] = useState<string | null>(null);
  const [requestUrl, setRequestUtl] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const getScreenShot = async (url: string): Promise<boolean> => {
    try {
      if (!isConnected) {
        openConnectModal!();
        return false;
      }
      console.log('tests');
      if (!address) {
        throw new Error('can not get address');
      }
      setRequesting(true);
      setRequested(false);
      setScreenshotUrl(null);
      setErrors([]);
      setRequestUtl(url);
      const response = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        try {
          if (response.status === 404) {
            setErrors((prev) => [...prev, 'can not find server']);
          }
          const data = await response.json();
          setErrors((prev) => [...prev, data.error]);
        } catch (error: any) {
          if (response.status === 500) {
            setErrors((prev) => [...prev, 'Internal Server Error']);
          }
          setErrors((prev) => [...prev, error.message]);
        }
        return true;
      }

      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      // @ts-ignore
      const hash = '0x' + encHex.stringify(sha256(CryptoJS.lib.WordArray.create(buffer)));
      setHashCheckSum(hash);

      const objectURL = URL.createObjectURL(blob);
      setScreenshotUrl(objectURL);

      setRequested(true);
      setRequesting(false);
    } catch (error: any) {
      setErrors((prev) => [...prev, error.message]);
    } finally {
      if (!!address) {
        setRequested(true);
        setRequesting(false);
      }
      return true;
    }
  };

  const notoriseHandler: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {
      const signer = await fetchSigner();
      if (!signer) return;

      const contract = new Contract(
        notaryShotContract.address,
        notaryShotContract.abi,
        signer,
      );

      const transaction = await contract.submitMint(requestUrl, hashCheckSum);
      const receipt = await transaction.wait();
      const gasUsed = receipt.gasUsed as BigInt;
      setNotorizeTxResult({ status: 'confirmed', gasUsed, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setNotorizeTxResult({ status: 'error', gasUsed: null, error: error.message });
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (!!screenshotUrl && !!requestUrl) {
      const img = new Image();
      img.src = screenshotUrl;

      const stamp = new Image();
      stamp.src = WATERMARK_URL;

      const loadImage = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Error on loading image src: ${img.src}`));
          img.src = src;
        });

      Promise.all([loadImage(screenshotUrl), loadImage(WATERMARK_URL)])
        .then(([backgroundImage, watermarkImage]) => {
          setStampedScreenshotUrl(
            getStampedImagePreviewDataUrl(
              backgroundImage,
              watermarkImage,
              getPreviewMetadata(requestUrl),
              PREVIEW_IMG_DEFAULT_WIDTH,
            ),
          );
        })
        .catch((error) => {
          setErrors((prev) => [...prev, error.message]);
        });
    }
  }, [screenshotUrl, requestUrl]);


  return (
    <div className={cn(classes.App, requesting || requested ? classes.requesting : null)}>
      <Header />
      <h1 className={classes.h1} hidden={requesting || requested}>
        Welcome to Quantum Oracle
      </h1>
      <div className={classes.urlForm}>
        <UrlForm onSubmit={getScreenShot} inline={requested || requesting} />
      </div>
      {requesting && <div className={classes.progress}>Requesting...</div>}
      {requested && (
        <div className={classes.results}>

          <ScreenshotPreview screenshot={screenshot} />
          {
            <div className={cn(classes.status, errors.length > 0 ? classes.failure : null)}>
              <h3 className={classes.h3}>status:</h3>
              {errors.length > 0 ? (
                errors.map((error, index) => (
                  <div key={error + index} className={classes.errorMessage}>
                    {'error: ' + error}
                  </div>
                ))
              ) : (
                <div className={classes.succeed}>succeed</div>
              )}
            </div>
          }
          <ScreenshotPreview screenshot={stampedScreenshot} />
          <div className={classes.controls}>
            <button className={classes.notorizeButton} onClick={notoriseHandler}>
              Notorize
            </button>
            {!!notorizeTxResult && (
              <div className={classes.txStatus}>
                <div>Status: {notorizeTxResult?.status}</div>
                {!!notorizeTxResult?.gasUsed && (
                  <div>Gas used: {notorizeTxResult?.gasUsed?.toString()}</div>
                )}
                {!!notorizeTxResult?.error && (
                  <div className={classes.txError}>Erorr: {notorizeTxResult?.error}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

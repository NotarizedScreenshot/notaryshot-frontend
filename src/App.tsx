import { memo, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import * as yup from 'yup';
import { Contract } from 'ethers';
import { fetchSigner } from '@wagmi/core';
import encHex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import notaryShotContract from 'contracts/screenshot-manager.json';
import { UrlForm, Header, ScreenshotPreview } from 'components';
import { getPreviewMetadata, convertImageSize, getOffset } from 'utils';
import classes from 'App.module.scss';

const Home: React.FC<{ address: string | undefined; isConnected: boolean }> = memo(
  ({ address, isConnected }) => {
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

    const { openConnectModal } = useConnectModal();

    const urlValidationSchema = { url: yup.string().required().url() };
    const validate = (url: string) =>
      yup.object().shape(urlValidationSchema).validate({ url });

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
        setScreenshot(null);
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
        setScreenshot(objectURL);

        setRequested(true);
        setRequesting(false);
      } catch (error: any) {
        setErrors((prev) => [...prev, error.message]);
      } finally {
        if (!address) return true;
        setRequested(true);
        setRequesting(false);
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

    const requestedUrlFromParams = new URLSearchParams(document.location.search).get('url');

    useEffect(() => {
      if (requestedUrlFromParams) {
        console.log('url', requestedUrlFromParams);
        validate(requestedUrlFromParams)
          .then(() => {
            getScreenShot(requestedUrlFromParams);
          })
          .catch((error: yup.ValidationError) => {
            setErrors((prev) => [...prev, error.message]);
            setRequested(true);
          });
      }
    }, []);

    useEffect(() => {
      if (!!screenshot && !!requestUrl) {
        const img = new Image();
        img.src = screenshot;
        console.log('img', img.width, img.height, img.sizes);

        const stamp = new Image();
        stamp.src = 'stamp.png';

        stamp.onload = () =>
          (img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 500;

            const imgWidth = img.width;
            const imgHeight = img.height;
            const imgRatio = imgWidth / imgHeight;

            const stampWidth = stamp.width;
            const stampHeight = stamp.height;

            const CANVAS_WIDTH = maxWidth;
            const CANVAS_HEIGHT = CANVAS_WIDTH / imgRatio;

            canvas.setAttribute('width', String(CANVAS_WIDTH));
            canvas.setAttribute('height', String(CANVAS_HEIGHT));

            const ctx = canvas.getContext('2d')!;

            ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            const stampFitCanvasSizes = convertImageSize(
              stampWidth,
              stampHeight,
              CANVAS_WIDTH,
              CANVAS_HEIGHT,
            );

            const offset = getOffset(
              CANVAS_WIDTH,
              CANVAS_HEIGHT,
              stampFitCanvasSizes.width,
              stampFitCanvasSizes.height,
            );
            ctx.drawImage(
              stamp,
              offset.x,
              offset.y,
              stampFitCanvasSizes.width,
              stampFitCanvasSizes.height,
            );

            ctx.font = '5px monospace';
            ctx.fillStyle = 'red';
            const ctxFillTextX = 10;
            const ctxFillTextY = 5;

            const metaPreview = getPreviewMetadata(requestUrl);

            metaPreview.forEach((string, index) => {
              const stringWidth = ctx.measureText(string).width;
              if (stringWidth > 480) {
                const maxLength = Math.floor(480 / (stringWidth / string.length));
                ctx.fillText(
                  string.substring(0, maxLength),
                  ctxFillTextX,
                  ctxFillTextY * index,
                );
                return;
              }
              ctx.fillText(string, ctxFillTextX, ctxFillTextY * index);
            });

            const buf = canvas.toDataURL();
            setStampedScreenshot(buf);
          })();
      }
    }, [screenshot, requestUrl]);

    return (
      <div className={cn(classes.App, requesting || requested ? classes.requesting : null)}>
        <Header />
        <h1 className={classes.h1} hidden={requesting || requested}>
          Welcome to Quantum Oracle
        </h1>
        <div className={classes.urlForm}>
          <UrlForm
            onSubmit={getScreenShot}
            inline={requested || requesting}
            initialInputData={requestedUrlFromParams}
          />
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
  },
);

function App() {
  const counter = useRef(0);
  counter.current += 1;
  console.log('App renders count 1:', counter.current);
  const { address, isConnected } = useAccount();
  return <Home address={address} isConnected={isConnected} />;
}

export default App;

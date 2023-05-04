/* eslint-disable no-restricted-globals */
import { memo, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { HeaderOld, MetadataPreviewOld, TweetDetailsPreview, TwitterIdForm } from 'components';
import cn from 'classnames';
import { IPreviewProps } from './PreviewProps';
import classes from './Preview.module.scss';
import { fetchPreviewDataByTweetId, submitNotarization } from 'lib/apiClient';
import { IMetadata, ITweetData } from 'types';
import { getSampleMetadata } from 'lib';
import { processTweetData, validateBigInt, getTrustedHashSum, getTweetResultsFromTweetRawData } from 'utils';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';

import { Contract } from 'ethers';
// import { IMetadata } from 'types';

import { fetchSigner } from '@wagmi/core';
import notaryShotContract from 'contracts/screenshot-manager.json';
// import { socket } from 'index';
import { usePreviewContext, useConnectionContext } from 'contexts';

export const PreviewComponent: React.FC<IPreviewProps> = memo(({ isConnected }) => {
  console.log('v1.01');
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [fetchingMetaData, setFetchingMetadata] = useState<boolean>(false);
  const [fetchingImageError, setFetchingImageError] = useState<Error | null>(null);
  const [fetchingMetadataError, setFetchingMetadataError] = useState<Error | null>(null);
  const [qrCodeError, setQrCodeError] = useState<Error | null>(null);
  const [prviewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const [fetchingPreviewImage, setFetchingPreviewImage] = useState<boolean>(false);
  const [notarizing, setNotarizing] = useState<boolean>(false);
  const [tweetId, setTweetId] = useState<string | null>(new URLSearchParams(document.location.search).get('tweetid'));
  const [tweetData, setTweetData] = useState<ITweetData | null>(null);
  const [tweetDataHash, setTweetDataHash] = useState<string | null>(null);

  const [previewImageHash, setPreviewImageHash] = useState<string | null>(null);
  const [metadataHash, setMetadataHash] = useState<string | null>(null);

  const [trustedHashSum, setTrustedHashSum] = useState<string | null>(null);
  const [notorizeTxResult, setNotorizeTxResult] = useState<{
    status: 'confirmed' | 'error';
    error: string | null;
  } | null>(null);

  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const previewContext = usePreviewContext();
  const { isConnected: isSocketConnected, userId } = useConnectionContext();

  useEffect(() => {
    console.log('preview hashes', previewContext);
    setPreviewImageHash(previewContext.hashes.previewStampedImageHase);
    setMetadataHash(previewContext.hashes.metadataToSaveCid);
  }, [previewContext.hashes]);

  fetchSigner().then((signer) => {
    if (!signer) {
      console.log('no signer');
      return;
    }
    console.log('has signer');
    const contract = new Contract(notaryShotContract.address, notaryShotContract.abi, signer);

    // contract.on()
    // const transaction = await contract.submitMint(tweetId, trustedHashSumBigIng);
    // const receipt: ContractReceipt = await transaction.wait();
    // console.log(receipt);

    contract.on('RequestContentHashSent', (...args) => {
      console.log('on RequestContentHashSent');
      console.log('args', args);
    });
    contract.on('Transfer', (...args) => {
      console.log('on Transfer');
      console.log('args', args);
    });
    contract.on('ChainlinkRequested', (...args) => {
      console.log('on ChainlinkRequested');
      console.log('args', args);
    });
  });

  const notarizeHandler = async () => {
    try {
      setNotorizeTxResult(null);
      setNotarizing(true);
      if (!tweetId || !trustedHashSum) {
        throw new Error(`error: no tweeId (${tweetId}) or on trustedHashSum (${trustedHashSum})`);
      }
      const result = await submitNotarization(tweetId);

      if (result.status === 'failed') throw new Error(String(result.error!));

      if (result.status === 1) {
        navigate(`/results?tweeId=${tweetId}`);
        return;
      }

      setNotorizeTxResult({ status: 'error', error: 'trasaction not performed' });
    } catch (error) {
      if (error instanceof Error) {
        setNotorizeTxResult({ status: 'error', error: error.message });
      }
      console.error(error);
    } finally {
      setNotarizing(false);
    }
  };

  const submitCheckHandler = async (value: string): Promise<boolean> => {
    isConnected ? setTweetId(value) : openConnectModal!();
    const history = createBrowserHistory();
    history.replace(`/preview?tweetid=${value}&userId=${userId}`);
    return true;
  };

  // socket.on('uploadComplete', (message) => {
  //   const { mediaCidMap, screenshotCid, stampedScreenShotCid } = message as {
  //     mediaCidMap: {
  //       url: string;
  //       cid: string | null;
  //       error?: string | undefined;
  //     }[];
  //     screenshotCid: string;
  //     stampedScreenShotCid: string;
  //   };
  //   setPreviewImageHash(stampedScreenShotCid);
  //   console.log('upload complete message', JSON.parse(message));
  // });

  useEffect(() => {
    if (!!tweetId) {
      setFetchingMetadata(true);
      setFetchingPreviewImage(true);
      setPreviewImageUrl(null);
      setMetadata(null);
      setPreviewImageHash(null);
      if (!userId) return;
      fetchPreviewDataByTweetId(tweetId, userId)
        .then((data) => {
          if (!data) {
            setFetchingImageError(new Error('failed to fetch image'));
            setFetchingMetadataError(new Error('failed to fetch metadata'));
            return;
          }
          console.log(data);
          // const { imageBlob, metaData, tweetData, imageBuffer } = data;
          const { imageUrl, tweetdata, metadata, jobId } = data as {
            imageUrl: string;
            tweetdata: string;
            metadata: string;
            jobId: string;
          };

          // console.log(data);

          if (!!metadata && !!imageUrl && !!tweetdata) {
            //   // const objectURL = URL.createObjectURL(imageBlob);
            //   // const screenShotHash = getTrustedHashSum(imageBuffer);
            //   // setPreviewImageHash(screenShotHash);
            //   // const metadataHashSum = getTrustedHashSum(JSON.stringify(metaData!));
            //   // setMetadataHash(metadataHashSum);
            // console.log(JSON.parse(tweetdata));

            setPreviewImageUrl(imageUrl);
            const parsedMetadata = JSON.parse(metadata);

            const parsedTweetdata = processTweetData(tweetdata, tweetId);

            setMetadata(parsedMetadata);
            setTweetData(parsedTweetdata);

            //   // const proccessedTweetData = !tweetData ? tweetData : processTweetData(tweetData, tweetId);
            //   // const tweetRawData = JSON.stringify(tweetData);
            //   // const proccessedTweetDataHashSum = getTrustedHashSum(JSON.stringify(proccessedTweetData!));

            //   // setTweetDataHash(proccessedTweetDataHashSum);

            //   const dataForTrustedHashSum = {
            //     // screenShotHash,
            //     // tweetRawData,
            //     // parsedTweetData: proccessedTweetData,
            //     metaData,
            //   };

            //   // const composedTrustedHashsum = getTrustedHashSum(JSON.stringify(dataForTrustedHashSum));

            //   //TODO: remove for release START
            //   // console.log('screenShotHash', screenShotHash);
            //   // const tweetRawDataHast = getTrustedHashSum(tweetRawData);
            //   // console.log('tweetRawDataHast', tweetRawDataHast);
            //   // console.log('proccessedTweetDataHashSum', proccessedTweetDataHashSum);
            //   // console.log('metadataHashSum', metadataHashSum);
            //   // console.log('trustedHashsum', composedTrustedHashsum);
            //   // console.log('trustedHashsum Bignum', BigInt('0x' + composedTrustedHashsum).toString());

            //   //TODO: remove for release END

            //   // setTrustedHashSum(composedTrustedHashsum);

            //   // setTweetData(proccessedTweetData);
          }
        })
        .finally(() => {
          setFetchingPreviewImage(false);
          setFetchingMetadata(false);
        });
    }
  }, [tweetId, userId]);

  useEffect(() => {
    if (!!metadata && !!tweetId && !!tweetData && !!metadataHash) {
      const data = { metadataHash };
      QRCode.toDataURL(JSON.stringify(data))
        .then(setQrUrl)
        .catch((error) => {
          console.log('qr error', error);
          setQrCodeError(error);
        });
    }
  }, [metadata, tweetId, tweetData, trustedHashSum, metadataHash, previewImageHash, tweetDataHash]);

  return (
    <div className={classes.container}>
      <HeaderOld />
      <div className={classes.content}>
        <h1 className={classes.h1}>Quantum oracle</h1>
        <div className={classes.requestForm}>
          <TwitterIdForm onSubmit={submitCheckHandler} inline initialInputData={tweetId} validate={validateBigInt} />
        </div>
        {!tweetId && <div className={classes.advise}>Enter a tweet id to start notarizing!</div>}
        {(!!fetchingMetadataError || !!fetchingImageError || !!qrCodeError) && (
          <div className={classes.advise}>
            Something goes wrong. Please try another tweet id or come back a little bit later.
          </div>
        )}
        <div className={classes.preview}>
          <div className={cn(classes.image, !prviewImageUrl ? classes.empty : null)}>
            {!tweetId && <div className={classes.getting}>Screenshot preview</div>}
            {tweetId && prviewImageUrl ? (
              <>
                <img src={prviewImageUrl} alt='screenshot' />
              </>
            ) : (
              <div className={classes.getting}>
                {fetchingPreviewImage ? 'Getting preview...' : fetchingImageError?.message}
              </div>
            )}
            {/* {true && <div className={classes.hash}>hash: {previewImageHash}</div>} */}
          </div>

          <div className={classes.qr}>
            {!tweetId && (
              <>
                <div className={classes.empty}>QR code</div>
                <div className={classes.notice}>Here will be your QR</div>
              </>
            )}
            {tweetId && (!prviewImageUrl || !metadata) && (
              <>
                <div className={classes.empty}>
                  {fetchingImageError || fetchingMetadataError ? 'Unable to build QR' : 'Building QR code...'}
                </div>
                <div className={classes.notice}>Here will be your QR</div>
              </>
            )}

            {tweetId && prviewImageUrl && qrUrl && (
              <>
                <img className={classes.qrImage} src={qrUrl} alt='meta qr' />
                {tweetId && <div className={classes.qrDescription}>Scan to get your metadata</div>}
              </>
            )}
            <div className={classes.notarize}>
              <button
                className={classes.button}
                disabled={!tweetId || !prviewImageUrl || notarizing || !prviewImageUrl || !metadata}
                onClick={notarizeHandler}
              >
                Notarize!
              </button>
              {!!notarizing && (
                <div className={classes.txStatus}>
                  <div className={classes.status}>Performing transaction...</div>
                </div>
              )}
              {!!notorizeTxResult && (
                <div className={classes.txStatus}>
                  <div className={classes.status}>Status: {notorizeTxResult?.status}</div>
                  {!!notorizeTxResult?.error && <div className={classes.txError}>Erorr: {notorizeTxResult?.error}</div>}
                </div>
              )}
            </div>
          </div>
          <div className={classes.meta}>
            {!fetchingMetaData && tweetData && <TweetDetailsPreview tweetData={tweetData} />}
            {!fetchingMetaData && !tweetData && <div className={classes.getting}>Failed to fetch tweet data</div>}
            {!tweetId && <MetadataPreviewOld data={getSampleMetadata()} preview={!tweetId} />}
            {tweetId && metadata && <MetadataPreviewOld data={metadata} preview={!tweetId} />}
            {fetchingMetaData && <div className={classes.getting}>Fetching metadata...</div>}
            {fetchingMetadataError && <div className={classes.getting}>Failed to fetch meta</div>}
          </div>
        </div>
      </div>
    </div>
  );
});

export const PreviewOld = () => {
  const { isConnected, address } = useAccount();
  return <PreviewComponent isConnected={isConnected} address={address} />;
};

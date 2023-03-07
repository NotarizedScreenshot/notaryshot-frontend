/* eslint-disable no-restricted-globals */
import { memo, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Header, MetadataPreview, TweetDetailsPreview, TwitterIdForm } from 'components';
import cn from 'classnames';
import { IPreviewProps } from './PreviewProps';
import classes from './Preview.module.scss';
import { submitNotarization, fetchPreviewDataByTweetId } from 'lib/apiClient';
import { IMetadata, ITweetData } from 'types';
import { getSampleMetadata } from 'lib';
import { validateBigInt } from 'utils';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { createBrowserHistory } from 'history';

import encHex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

export const PreviewComponent: React.FC<IPreviewProps> = memo(({ isConnected }) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [fetchingMetaData, setFetchingMetadata] = useState<boolean>(false);
  const [fetchingImageError, setFetchingImageError] = useState<Error | null>(null);
  const [fetchingMetadataError, setFetchingMetadataError] = useState<Error | null>(null);
  const [qrCodeError, setQrCodeError] = useState<Error | null>(null);
  const [prviewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [fetchingPreviewImage, setFetchingPreviewImage] = useState<boolean>(false);
  const [notarizing, setNotarizing] = useState<boolean>(false);
  const [tweetId, setTweetId] = useState<string | null>(
    new URLSearchParams(document.location.search).get('tweetid'),
  );
  const [tweetData, setTweetData] = useState<ITweetData | null>(null);

  const [previewImageHash, setPreviewImageHash] = useState<string | null>(null);

  //TODO: add creating hashes
  const dnsHash = '0x4fb2eb368ada78c4c8f4f25839ec6a0c5c4b47eb9c70a87860783122c949c201';
  const headersHash = '0x4fb2eb368ada78c4c8f4f25839ec6a0c5c4b47eb9c70a87860783122c949c202';
  const tweetStatsHash = '0x4fb2eb368ada78c4c8f4f25839ec6a0c5c4b47eb9c70a87860783122c949c202';
  const tweetUserInfoHash = '0x4fb2eb368ada78c4c8f4f25839ec6a0c5c4b47eb9c70a87860783122c949c202';
  const tweetBodyDetailsHash = '0x4fb2eb368ada78c4c8f4f25839ec6a0c5c4b47eb9c70a87860783122c949c202';

  const { openConnectModal } = useConnectModal();

  const notarizeHandler = () => {
    if (!!tweetId) {
      setNotarizing(true);
      //TODO: add notarization handler
      submitNotarization(tweetId).finally(() => {
        setNotarizing(false);
      });
    }
  };

  const submitCheckHandler = async (value: string): Promise<boolean> => {
    isConnected ? setTweetId(value) : openConnectModal!();
    const history = createBrowserHistory();
    history.replace(`/preview?tweetid=${value}`);
    return true;
  };

  useEffect(() => {
    if (!!tweetId) {
      setFetchingMetadata(true);
      setFetchingPreviewImage(true);
      setPreviewImageUrl(null);
      setMetadata(null);
      setPreviewImageHash(null);
      fetchPreviewDataByTweetId(tweetId)
        .then((data) => {
          if (!data) {
            setFetchingImageError(new Error('failed to fetch image'));
            setFetchingMetadataError(new Error('failed to fetch metadata'));
            return;
          }
          const { imageBlob, metaData, tweetData } = data;

          const objectURL = URL.createObjectURL(imageBlob);
          imageBlob
            .arrayBuffer()
            .then((buffer) => {
              // @ts-ignore
              const hash = '0x' + encHex.stringify(sha256(CryptoJS.lib.WordArray.create(buffer)));
              setPreviewImageHash(hash);
            })
            .catch((error) => {
              console.error(error);
            });

          setPreviewImageUrl(objectURL!);
          setMetadata(metaData);
          setTweetData(tweetData);
        })
        .finally(() => {
          setFetchingPreviewImage(false);
          setFetchingMetadata(false);
        });
    }
  }, [tweetId]);

  useEffect(() => {
    if (!!metadata) {
      QRCode.toDataURL(`https://twitter.com/twitter/status/${tweetId}`)
        .then(setQrUrl)
        .catch((error) => {
          console.log('qr error', error);
          setQrCodeError(error);
        });
    }
  }, [metadata, tweetId]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.content}>
        <h1 className={classes.h1}>Quantum oracle</h1>
        <div className={classes.requestForm}>
          <TwitterIdForm
            onSubmit={submitCheckHandler}
            inline
            initialInputData={tweetId}
            validate={validateBigInt}
          />
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
            {previewImageHash && <div className={classes.hash}>hashSum: {previewImageHash}</div>}
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
                  {fetchingImageError || fetchingMetadataError
                    ? 'Unable to build QR'
                    : 'Building QR code...'}
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
            </div>
          </div>
          <div className={classes.meta}>
            {!fetchingMetaData && tweetData && (
              <TweetDetailsPreview
                tweetData={tweetData}
                tweetStatsHash={tweetStatsHash}
                tweetUserInfoHash={tweetUserInfoHash}
                tweetBodyDetailsHash={tweetBodyDetailsHash}
              />
            )}
            {!fetchingMetaData && !tweetData && (
              <div className={classes.getting}>Failed to fetch tweet data</div>
            )}
            {!tweetId && <MetadataPreview data={getSampleMetadata()} preview={!tweetId} />}
            {tweetId && metadata && (
              <MetadataPreview
                data={metadata}
                preview={!tweetId}
                dnsHash={dnsHash}
                headersHash={headersHash}
              />
            )}
            {fetchingMetaData && <div className={classes.getting}>Fetching metadata...</div>}
            {fetchingMetadataError && <div className={classes.getting}>Failed to fetch meta</div>}
          </div>
        </div>
      </div>
    </div>
  );
});

export const Preview = () => {
  const { isConnected, address } = useAccount();
  return <PreviewComponent isConnected={isConnected} address={address} />;
};

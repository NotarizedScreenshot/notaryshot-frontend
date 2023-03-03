import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Header, MetadataPreview, TwitterIdForm } from 'components';
import cn from 'classnames';
import { IPreviewProps } from './PreviewProps';
import classes from './Preview.module.scss';
import { fetchMetadataById, fetchPreviewImageByID, submitNotarization } from 'lib/apiClient';
import { IMetadata } from 'types';
import { getSampleMetadata } from 'lib';
import { validateBigInt } from 'utils';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const Preview: React.FC<IPreviewProps> = () => {
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

  const { isConnected } = useAccount();
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
    return true;
  };

  useEffect(() => {
    if (!!tweetId) {
      setFetchingMetadata(true);
      setFetchingPreviewImage(true);
      fetchMetadataById(tweetId)
        .then(setMetadata)
        .catch((error) => {
          console.error('Fetching metadata error:', error);
          setFetchingMetadataError(error);
        })
        .finally(() => {
          setFetchingMetadata(false);
        });

      fetchPreviewImageByID(tweetId)
        .then(setPreviewImageUrl)
        .catch((error) => {
          console.error('Fetching previewIamge error:', error);
          setFetchingImageError(error);
        })
        .finally(() => {
          setFetchingPreviewImage(false);
        });
    }
  }, [tweetId]);

  useEffect(() => {
    if (!!metadata) {
      //TODO: add qr code info compiler
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
        {!tweetId && (
          <div className={classes.advise}>Enter a tweet id to start notarizing!</div>
        )}
        {(!!fetchingMetadataError || !!fetchingImageError || !!qrCodeError) && (
          <div className={classes.advise}>
            Something goes wrong. Please try another tweet id or come back a little bit later.
          </div>
        )}
        <div className={classes.preview}>
          <div className={cn(classes.image, !prviewImageUrl ? classes.empty : null)}>
            {!tweetId && <div className={classes.getting}>Screenshot preview</div>}
            {tweetId && prviewImageUrl ? (
              <img src={prviewImageUrl} alt='screenshot' />
            ) : (
              <div className={classes.getting}>
                {fetchingPreviewImage ? 'Getting preview...' : fetchingImageError?.message}
              </div>
            )}
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
                {tweetId && (
                  <div className={classes.qrDescription}>Scan to get your metadata</div>
                )}
              </>
            )}
            <div className={classes.notarize}>
              <button
                className={classes.button}
                disabled={
                  !tweetId || !prviewImageUrl || notarizing || !prviewImageUrl || !metadata
                }
                onClick={notarizeHandler}
              >
                Notarize!
              </button>
            </div>
          </div>
          <div className={classes.meta}>
            {!tweetId && <MetadataPreview data={getSampleMetadata()} preview={!tweetId} />}
            {tweetId && metadata && <MetadataPreview data={metadata} preview={!tweetId} />}
            {fetchingMetaData && <div className={classes.getting}>Fetching metadata...</div>}
            {fetchingMetadataError && (
              <div className={classes.getting}>Failed to fetch meta</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

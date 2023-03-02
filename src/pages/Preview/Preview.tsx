import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Header, UrlForm, MetadataPreview } from 'components';
import { IPreviewProps } from './PreviewProps';
import classes from './Preview.module.scss';
import { fetchMetadataById, fetchPreviewImageByID, submitNotarization } from 'lib/apiClient';
import { IMetadata } from 'types';

// import metadata from 'meta-preview.json';

export const Preview: React.FC<IPreviewProps> = () => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [prviewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [notarizing, setNotarizing] = useState<boolean>(false);

  const tweetId = new URLSearchParams(document.location.search).get('tweetid');

  const notarizeHandler = () => {
    if (!!tweetId) {
      setNotarizing(true);
      //TODO: add notarization handler
      submitNotarization(tweetId).finally(() => {
        setNotarizing(false);
      });
    }
  };

  useEffect(() => {
    if (!!tweetId) {
      fetchMetadataById(tweetId)
        .then(setMetadata)
        .catch((error) => {
          console.error('Fetching metadata error:', error); //TODO: add error handler and error component
        });

      fetchPreviewImageByID(tweetId)
        .then(setPreviewImageUrl)
        .catch((error) => {
          console.error('Fetching previewIamge error:', error); //TODO: add error handler and error component
        });
    }
  }, [tweetId]);

  useEffect(() => {
    if (!!metadata) {
      //TODO: add qr code info compiler
      QRCode.toDataURL(`https://twitter.com/twitter/status/${tweetId}`).then(setQrUrl);
    }
  }, [metadata, tweetId]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.content}>
        <h1 className={classes.h1}>Quantum oracle</h1>
        <div className={classes.requestForm}>
          <UrlForm onSubmit={async (str: string) => true} inline initialInputData={tweetId} />
        </div>
        <div className={classes.preview}>
          <div className={classes.image}>
            {prviewImageUrl ? (
              <img src={prviewImageUrl} alt='screenshot' />
            ) : (
              <div className={classes.getting}>Getting preview...</div>
            )}
          </div>
          <div className={classes.qr}>
            {prviewImageUrl && qrUrl && (
              <>
                <img className={classes.qrImage} src={qrUrl} alt='meat qr' />
                <div className={classes.qrDescription}>Scan to get your metadata</div>
                <div className={classes.notarize}>
                  <button
                    className={classes.button}
                    disabled={notarizing}
                    onClick={notarizeHandler}
                  >
                    Notarize!
                  </button>
                </div>
              </>
            )}
          </div>
          <div className={classes.meta}>
            {metadata ? (
              <MetadataPreview data={metadata} />
            ) : (
              <div className={classes.getting}>Getting metadata...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

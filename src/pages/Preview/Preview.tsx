import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { CustomForm, TweetResults, Header, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';
import { memo, useEffect, useState } from 'react';
import { IMetadata, ITweetData } from 'types';
import { fetchPreviewDataByTweetId } from 'lib/apiClient';
import { processTweetData, validateBigInt } from 'utils';
import { createBrowserHistory } from 'history';
import { usePreviewContext, useConnectionContext } from 'contexts';

const PreviewComponent: React.FC<IPreviewProps> = memo(() => {
  const [fetching, setFetcing] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [tweetData, setTweetData] = useState<ITweetData | null>(null);
  const [prviewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [tweetId, setTweetId] = useState<string | null>(new URLSearchParams(document.location.search).get('tweetid'));
  const { userId } = useConnectionContext();
  const previewContext = usePreviewContext();

  const submitCheckHandler = async (value: string): Promise<boolean> => {
    setTweetId(value);
    const history = createBrowserHistory();
    history.replace(`/preview?tweetid=${value}&userId=${userId}`);
    return true;
  };

  useEffect(() => {
    console.log('useEffect', tweetId);
    if (!!tweetId /*&& !!userId*/) {
      previewContext.setTweetId(tweetId);
      setFetcing(true);
      fetchPreviewDataByTweetId(tweetId, userId)
        .then((data) => {
          if (!data) {
            // setFetchingImageError(new Error('failed to fetch image'));
            // setFetchingMetadataError(new Error('failed to fetch metadata'));
            return;
          }
          const { imageUrl, tweetdata, metadata } = data;

          if (!!metadata) {
            const parsedMetadata = JSON.parse(metadata);
            setMetadata(parsedMetadata);
          }

          if (!!tweetdata) {
            const parsedTweetdata = processTweetData(tweetdata, tweetId);
            setTweetData(parsedTweetdata);
          }
          if (!!imageUrl) {
            setPreviewImageUrl(imageUrl);
          }
        })
        .finally(() => {
          setFetcing(false);
        });
    }
  }, [tweetId, userId, previewContext]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <CustomForm onSubmit={submitCheckHandler} initialInputData={tweetId} validate={validateBigInt} />
        {fetching && (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {tweetId && !fetching && (
          <>
            <div className={styles.bgCircles}></div>
            <div className={styles.spy}>
              <img src='/images/spy.png' alt='spy'></img>
            </div>
            <div className={styles.message}>
              <div className={styles.text}>
                If you click on «Notarize» your data will be saved forever, show off your NFT like a real secret agent!
              </div>
            </div>
            <h2 className={styles.h2}>Confirm Verification</h2>
            <TweetResults imageUrl={prviewImageUrl} tweetdata={tweetData} />
            <MetadataPreview blocked={!metadata} title={`Http headers meta${!metadata && ': metadata unavailable'}`}>
              {metadata && <HTTPMetadata metadata={metadata} />}
            </MetadataPreview>
            <MetadataPreview blocked={!metadata} title='DNS headers meta'>
              {metadata && <DNSMetadata metadata={metadata} />}
            </MetadataPreview>
          </>
        )}
      </main>
    </div>
  );
});

export const Preview = () => {
  // const { isConnected, address } = useAccount();
  return <PreviewComponent />;
};

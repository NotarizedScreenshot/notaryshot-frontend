import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { CustomForm, TweetResults, Header, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';
import { useEffect, useState } from 'react';
import { IMetadata, ITweetData } from 'types';
import { fetchPreviewDataByTweetId } from 'lib/apiClient';
import { processTweetData } from 'utils';

export const Preview: React.FC<IPreviewProps> = () => {
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [tweetData, setTweetData] = useState<ITweetData | null>(null);
  const [prviewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const tweetId = '1639773626709712896';
  const userId = '5pwFSGsG9PyBPUbKAAGD';

  useEffect(() => {
    fetchPreviewDataByTweetId(tweetId, userId).then((data) => {
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
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.bgCircles}></div>
        <div className={styles.spy}>
          <img src='/images/spy.png' alt='spy'></img>
        </div>
        <div className={styles.message}>
          <div className={styles.text}>
            If you click on «Notarize» your data will be saved forever, show off your NFT like a real secret agent!
          </div>
        </div>
        <CustomForm />
        <h2 className={styles.h2}>Confirm Verification</h2>
        <TweetResults imageUrl={prviewImageUrl} tweetdata={tweetData} />
        <MetadataPreview blocked={!metadata} title={`Http headers meta${!metadata && ': metadata unavailable'}`}>
          {metadata && <HTTPMetadata metadata={metadata} />}
        </MetadataPreview>
        <MetadataPreview blocked={!metadata} title='DNS headers meta'>
          {metadata && <DNSMetadata metadata={metadata} />}
        </MetadataPreview>
      </main>
    </div>
  );
};

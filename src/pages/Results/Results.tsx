import { IResultsProps } from './ResultsProps';
import styles from './Results.module.scss';
import { Header, TweetIdForm, TweetResults, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';
import { memo } from 'react';
import { useContractContext, useFetchingContext } from 'contexts';

export const Results: React.FC<IResultsProps> = memo(() => {
  const { nftId } = useContractContext();

  const { data, tweetId } = useFetchingContext();
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TweetIdForm />
        {data && (
          <>
            <div className={styles.tweetResults}>
              <div className={styles.bgCircles}></div>

              <div className={styles.title}>
                <h2 className={styles.h2}>Tweet verified!</h2>
                <p className={styles.p3}>{`id: ${tweetId}`}</p>
              </div>
              <TweetResults imageUrl={data.imageUrl} tweetdata={data.tweetdata} tweetId={tweetId} nftId={nftId} />
              <div className={styles.spy}>
                <img src='/images/spy.png' alt='spy'></img>
              </div>
              <div className={styles.message}>
                <div className={styles.text}>Great! Your NFT is notarized! Now you have invincible evidence!</div>
              </div>
            </div>
            <MetadataPreview
              blocked={!data.metadata}
              title={`Http headers meta${!data.metadata ? ': data unavailable' : ''}`}
            >
              {data.metadata && <HTTPMetadata metadata={data.metadata} />}
            </MetadataPreview>
            <MetadataPreview
              blocked={!data.metadata}
              title={`DNS headers meta${!data.metadata ? ': data unavailable' : ''}`}
            >
              {data.metadata && <DNSMetadata metadata={data.metadata} />}
            </MetadataPreview>
          </>
        )}
      </main>
    </div>
  );
});

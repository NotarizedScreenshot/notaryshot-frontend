import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import {
  TweetIdForm,
  TweetResults,
  Header,
  MetadataPreview,
  HTTPMetadata,
  DNSMetadata,
  Preloader,
  Modal,
} from 'components';
import { useFetchingContext, useProgressingContext, useModalContext, useConnectionContext } from 'contexts';

export const Preview: React.FC<IPreviewProps> = () => {
  const { data, isFetching, tweetId, error: fetchingError } = useFetchingContext();
  const { isShowModal } = useModalContext();
  const { inProgress } = useProgressingContext();
  const { connectionError } = useConnectionContext();

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {(isFetching || inProgress) && <Preloader percent={!isFetching ? 10 : 5} />}
        {isShowModal && <Modal />}
        <TweetIdForm />
        {(connectionError || fetchingError) && (
          <div className={styles.errors}>
            <h2 className={styles.h2}>Error</h2>
            <p className={styles.p2}>{connectionError}</p>
            <p className={styles.p2}>Please try again later or contact our team for support.</p>
          </div>
        )}
        {data && !isFetching && (
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
            <TweetResults imageUrl={data.imageUrl} tweetdata={data.tweetdata} tweetId={tweetId} />
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
};

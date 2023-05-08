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
import { validateBigInt } from 'utils';
import { useFetchingContext, useProgressingContext, useModalContext } from 'contexts';

export const Preview: React.FC<IPreviewProps> = () => {
  const { data, isFetching, tweetId } = useFetchingContext();
  const { isShowModal } = useModalContext();
  const { inProgress } = useProgressingContext();

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {(isFetching || inProgress) && <Preloader percent={!isFetching ? 10 : 5} />}
        {isShowModal && <Modal />}
        <TweetIdForm validate={validateBigInt} />
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
              title={`Http headers meta${!data.metadata && ': metadata unavailable'}`}
            >
              {data.metadata && <HTTPMetadata metadata={data.metadata} />}
            </MetadataPreview>
            <MetadataPreview blocked={!data.metadata} title='DNS headers meta'>
              {data.metadata && <DNSMetadata metadata={data.metadata} />}
            </MetadataPreview>
          </>
        )}
      </main>
    </div>
  );
};

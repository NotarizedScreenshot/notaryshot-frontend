import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { CustomForm, TweetResults, Header, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';

export const Preview: React.FC<IPreviewProps> = () => {
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
        <TweetResults />
        <MetadataPreview title='Http headers meta'>
          <HTTPMetadata />
        </MetadataPreview>
        <MetadataPreview title='DNS headers meta'>
          <DNSMetadata />
        </MetadataPreview>
      </main>
    </div>
  );
};

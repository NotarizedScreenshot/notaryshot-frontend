import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { CustomForm, TweetResults, Header, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';

export const Preview: React.FC<IPreviewProps> = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
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

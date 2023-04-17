import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { CustomForm, Header } from 'components';
export const Preview: React.FC<IPreviewProps> = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <CustomForm />
        <h2 className={styles.h2}>Confirm Verification</h2>
      </main>
    </div>
  );
};

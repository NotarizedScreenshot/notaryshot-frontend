import { IPreviewProps } from './PreviewProps';
import styles from './Preview.module.scss';
import { Header } from 'components';
export const Preview: React.FC<IPreviewProps> = () => {
  return (
    <div className={styles.container}>
      <Header />
      Prevuew
    </div>
  );
};

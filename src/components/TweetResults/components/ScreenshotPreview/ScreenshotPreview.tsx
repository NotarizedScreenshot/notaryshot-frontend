import { IScreenshotPreviewProps } from './ScreenshotPreviewProps';
import styles from './ScreenshotPreview.module.scss';
export const ScreenshotPreview: React.FC<IScreenshotPreviewProps> = ({ imageUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={imageUrl} alt='screenshot' />
      </div>
    </div>
  );
};

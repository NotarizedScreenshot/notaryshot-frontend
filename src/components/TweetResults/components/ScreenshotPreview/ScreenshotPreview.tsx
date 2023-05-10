import { IScreenshotPreviewProps } from './ScreenshotPreviewProps';
import styles from './ScreenshotPreview.module.scss';
import { GatewayLink } from 'components';
import { useFetchingContext, useProgressingContext, useTransactionContext } from 'contexts';

export const ScreenshotPreview: React.FC<IScreenshotPreviewProps> = ({ imageUrl }) => {
  const { tweetId } = useFetchingContext();
  const { transactionStatus, transactionId } = useTransactionContext();
  const { contentId } = useProgressingContext();

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={imageUrl} alt='screenshot' />
      </div>
      {transactionStatus && transactionId && contentId && (
        <GatewayLink cid={contentId.screenshotCid} title={`tweet ${tweetId} screenshot`} />
      )}
    </div>
  );
};

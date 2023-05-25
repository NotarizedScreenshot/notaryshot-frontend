import { ITweetMediaProps } from './TweetMediaProps';
import styles from './TweetMedia.module.scss';
import { GatewayLink } from 'components/GatewayLink';
import { useProgressingContext, useTransactionContext } from 'contexts';
export const TweetMedia: React.FC<ITweetMediaProps> = ({ media }) => {
  const { transactionStatus, transactionId } = useTransactionContext();
  const { contentId } = useProgressingContext();

  const getCIDByUrl = (url: string): string | null => {
    try {
      const uploadedMedia = contentId?.mediaCidMap.find((el) => el.url === url);
      return uploadedMedia ? uploadedMedia.cid : null;
    } catch (error) {
      console.error(`cant get CID for ${url}`);
      return null;
    }
  };
  
  return (
    <div className={styles.container}>
      {media.map((mediaElement, index) => {
        return (
          <div key={`${mediaElement.src}${index}`} className={styles.mediaElement}>
            <div className={styles.preview}>
              <a href={mediaElement.src} target='_blank' rel='noreferrer'>
                <img src={mediaElement.type === 'video' ? mediaElement.thumb : mediaElement.src} alt='media element' />
              </a>
            </div>
            {transactionStatus &&
              transactionId &&
              contentId &&
              (mediaElement.type === 'video' ? (
                <>
                  {mediaElement.thumb && (
                    <GatewayLink cid={getCIDByUrl(mediaElement.thumb)} size='small' title={`preview_${index + 1}`} />
                  )}
                  <GatewayLink cid={getCIDByUrl(mediaElement.src)} size='small' title={`video_${index + 1}`} />
                </>
              ) : (
                <GatewayLink cid={getCIDByUrl(mediaElement.src)} size='small' title={`image_${index + 1}`} />
              ))}
          </div>
        );
      })}
    </div>
  );
};

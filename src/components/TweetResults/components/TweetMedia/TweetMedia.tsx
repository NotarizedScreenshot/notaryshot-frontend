import { ITweetMediaProps } from './TweetMediaProps';
import styles from './TweetMedia.module.scss';
export const TweetMedia: React.FC<ITweetMediaProps> = ({ media }) => {
  return (
    <div className={styles.container}>
      {media.map((mediaElement, index) => {
        return (
          <div key={`${mediaElement.src}${index}`} className={styles.mediaElement}>
            <a href={mediaElement.src} target='_blank' rel='noreferrer'>
              <img src={mediaElement.type === 'video' ? mediaElement.thumb : mediaElement.src} alt='media element' />
            </a>
          </div>
        );
      })}
    </div>
  );
};

import cn from 'classnames';
import { ITweetAttributesProps } from './TweetAttributesProps';
import styles from './TweetAttributes.module.scss';
export const TweetAttributes: React.FC<ITweetAttributesProps> = ({ attributes }) => {
  return (
    <div className={styles.container}>
      {attributes && attributes.hashtags && attributes.hashtags.length > 0 && (
        <div className={cn(styles.attributes, styles.hashtags)}>
          <div className={styles.icon}>
            <img src='images/hashtag-icon.png' alt='hashtages icon' />
          </div>
          {attributes.hashtags.map((hashtag, index) => (
            <div key={`${hashtag}-${index}`} className={cn(styles.attribute, styles.hashtag)}>
              <a href={`https://twitter.com/hashtag/${hashtag}`} target='_blank' rel='noreferrer'>{`#${hashtag}`}</a>
              </div>
          ))}
        </div>
      )}
      {attributes && attributes.user_mentions && attributes.user_mentions.length > 0 && (
        <div className={cn(styles.attributes, styles.hashtag)}>
          <div className={styles.icon}>
            <img src='images/mention-icon.png' alt='hashtages icon' />
          </div>
          {attributes.user_mentions.map((user_mention, index) => (
            <div key={`${user_mention}-${index}`} className={cn(styles.attribute, styles.user_mention)}>
              <a href={`https://twitter.com/${user_mention}`} target='_blank' rel='noreferrer'>{`@${user_mention}`}</a>
            </div>
          ))}
        </div>
      )}
      {attributes && attributes.urls && attributes.urls.length > 0 && (
        <div className={cn(styles.attributes, styles.hashtag)}>
          <div className={styles.icon}>
            <img src='images/urls-Icon.png' alt='hashtages icon' />
          </div>

          {attributes.urls.map((url, index) => (
            <div key={`${url}-${index}`} className={cn(styles.attribute, styles.url)}>
              <a href={url} target='_blank' rel='noreferrer'>{`${url}`}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// https://twitter.com/hashtag/QuantumOracle
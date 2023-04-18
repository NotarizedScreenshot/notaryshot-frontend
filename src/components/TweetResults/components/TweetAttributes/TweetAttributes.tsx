import { ITweetAttributesProps } from './TweetAttributesProps';
import cn from 'classnames';
import styles from './TweetAttributes.module.scss';
export const TweetAttributes: React.FC<ITweetAttributesProps> = ({ hashtags, user_mentions, urls }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.attributes, styles.hashtags)}>
        <div className={styles.icon}>
          <img src='/images/hashtag-icon.png' alt='hashtages icon' />
        </div>
        {hashtags.map((hashtag, index) => (
          <div key={`${hashtag}-${index}`} className={cn(styles.attribute, styles.hashtag)}>{`#${hashtag}`}</div>
        ))}
      </div>
      <div className={cn(styles.attributes, styles.hashtag)}>
        <div className={styles.icon}>
          <img src='/images/mention-icon.png' alt='hashtages icon' />
        </div>
        {user_mentions.map((user_mention, index) => (
          <div key={`${user_mention}-${index}`} className={cn(styles.attribute, styles.user_mention)}>
            <a href={`https://twitter.com/${user_mention}`} target='_blank' rel='noreferrer'>{`@${user_mention}`}</a>{' '}
          </div>
        ))}
      </div>
      <div className={cn(styles.attributes, styles.hashtag)}>
        <div className={styles.icon}>
          <img src='/images/urls-icon.png' alt='hashtages icon' />
        </div>

        {urls.map((url, index) => (
          <div key={`${url}-${index}`} className={cn(styles.attribute, styles.url)}>
            <a href={url} target='_blank' rel='noreferrer'>{`${url}`}</a>{' '}
          </div>
        ))}
      </div>
    </div>
  );
};

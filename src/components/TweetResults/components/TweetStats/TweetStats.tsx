import { ITweetStatsProps } from './TweetStatsProps';
import styles from './TweetStats.module.scss';
export const TweetStats: React.FC<ITweetStatsProps> = ({
  favorite_count,
  quote_count,
  retweet_count,
  views_count,
  bookmark_count,
}) => {
  console.log(favorite_count, quote_count, retweet_count, views_count, bookmark_count);
  return (
    <div className={styles.container}>
      <div className={styles.stat}>
        <div className={styles.icon}>
          <img src='images/Icon-likes.png' alt='like icon' />
        </div>
        {!favorite_count ? '0' : favorite_count}
      </div>
      <div className={styles.stat}>
        <div className={styles.icon}>
          <img src='images/Icon-retweets.png' alt='like icon' />
        </div>
        {!retweet_count ? '0' : retweet_count}
      </div>
      <div className={styles.stat}>
        <div className={styles.icon}>
          <img src='images/Icon-comments.png' alt='like icon' />
        </div>
        {!quote_count ? '0' : quote_count}
      </div>
      <div className={styles.stat}>
        <div className={styles.icon}>
          <img src='images/Icon-views.png' alt='like icon' />
        </div>
        {!views_count ? '0' : views_count}
      </div>
      <div className={styles.stat}>
        <div className={styles.icon}>
          <img src='images/Icon-bookmarks.png' alt='like icon' />
        </div>
        {!bookmark_count ? '0' : bookmark_count}
      </div>
    </div>
  );
};

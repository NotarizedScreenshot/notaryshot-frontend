import { ITweetAuthorProps } from './TweetAuthorProps';
import styles from './TweetAuthor.module.scss';
export const TweetAuthor: React.FC<ITweetAuthorProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        <img
          className={styles.img}
          src='https://pbs.twimg.com/profile_images/1610758457795219456/1wdNFy1r_normal.jpg'
          alt='proile avatar'
        />
      </div>
      <div className={styles.profileName}>
        <a className={styles.profileLink} href='https://twitter.com/elonmusk'>
          ChainHackers
        </a>
      </div>
    </div>
  );
};

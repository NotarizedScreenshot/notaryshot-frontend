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
          <span>ChainHackers</span>
          <svg width='13' height='13' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 12L12 4' stroke='#187EC5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
            <path
              d='M5.5 4H12V10.5'
              stroke='#187EC5'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

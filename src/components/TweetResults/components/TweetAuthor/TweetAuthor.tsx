import { ITweetAuthorProps } from './TweetAuthorProps';
import styles from './TweetAuthor.module.scss';
export const TweetAuthor: React.FC<ITweetAuthorProps> = ({ profile_image_url_https, name, screen_name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileImage}>
        <img className={styles.img} src={profile_image_url_https} alt='proile avatar' />
      </div>
      <div className={styles.profileName}>
        <a className={styles.profileLink} href={`https://twitter.com/${screen_name}`} target='_blank' rel='noreferrer'>
          <span>{name}</span>
          <svg width='13' height='13' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 12L12 4' stroke='#187EC5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M5.5 4H12V10.5' stroke='#187EC5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </a>
      </div>
    </div>
  );
};

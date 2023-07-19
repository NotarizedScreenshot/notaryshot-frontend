import { IProcessEventProps } from './ProcessEventProps';
import styles from './ProcessEvent.module.scss';
export const ProcessEvent: React.FC<IProcessEventProps> = ({ userPic, message, tweetPic }) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div className={styles.bubble}>
          <img src='images/bubble-mobile.png' alt='bubble' />
        </div>
        <p className={styles.p}>{message}</p>
      </div>
      <div className={styles.pictures}>
        {userPic && (
          <div className={styles.userPic}>
            <img src={userPic} alt='user avatar pic' />
          </div>
        )}
        {tweetPic && (
          <div className={styles.tweetPic}>
            <img src={tweetPic} alt='tweet screenshot' />
          </div>
        )}
      </div>
    </div>
  );
};

import { IHowItWorksCardProps } from './HowItWorksCardProps';
import styles from './HowItWorksCard.module.scss';
import { CircledNumber } from 'components/CircledNumber';
export const HowItWorksCard: React.FC<IHowItWorksCardProps> = ({
  number = 0,
  message = 'message text',
  personImageUrl,
  tweetImageUrl,
}) => {
  console.log(Array.isArray(message));
  return (
    <div className={styles.container}>
      <div className={styles.number}>
        <CircledNumber number={number} />
      </div>
      <div className={styles.bubble}>
        <div className={styles.message}>
          {Array.isArray(message)
            ? message.map((string, index) => (
                <span key={index} className={styles.lined}>
                  {string}
                </span>
              ))
            : message}
        </div>
      </div>
      {personImageUrl && (
        <div className={styles.person}>
          <img src={personImageUrl} alt='person1' />
        </div>
      )}
      {tweetImageUrl && (
        <div className={styles.action}>
          <img src={tweetImageUrl} alt='act1' />
        </div>
      )}
    </div>
  );
};

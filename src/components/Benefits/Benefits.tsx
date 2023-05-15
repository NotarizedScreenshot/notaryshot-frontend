import { IBenefitsProps } from './BenefitsProps';
import styles from './Benefits.module.scss';
export const Benefits: React.FC<IBenefitsProps> = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Discover, Verify, and Mint. Here are some benefits of using QuantumOracle:</h2>
      <ul className={styles.benefitsList}>
        <li className={styles.benefitsListElement}>
          <p className={styles.p2}>
            Take ownership of your discoveries and get recognition for your investigative work.
          </p>
          <div className={styles.benefitImg}>
            <img src='images/benefits-ownership.png' alt='benefit 1' />
          </div>
        </li>
        <li className={styles.benefitsListElement}>
          <p className={styles.p2}>Build a collection of verified findings and tell a story that others can trust.</p>
          <div className={styles.benefitImg}>
            <img src='images/benefits-collection.png' alt='benefit 1' />
          </div>
        </li>
        <li className={styles.benefitsListElement}>
          <p className={styles.p2}>
            Potentially earn monetary rewards for valuable discoveries that contribute to the public record.
          </p>
          <div className={styles.benefitImg}>
            <img src='images/benefits-monetary.png' alt='benefit 1' />
          </div>
        </li>
      </ul>
    </div>
  );
};

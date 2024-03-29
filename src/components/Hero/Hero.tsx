import { IHeroProps } from './HeroProps';
import styles from './Hero.module.scss';
import { Button } from 'components';
export const Hero: React.FC<IHeroProps> = () => {
  const handleClickScroll = () => {
    const trySection = document.getElementById('try');
    if (trySection) {
      trySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.rock1}>
        <img src='images/rock-1.png' alt='rock' />
      </div>
      <div className={styles.rock2}>
        <img src='images/rock-2.png' alt='rock' />
      </div>
      <div className={styles.rock3}>
        <img src='images/rock-3.png' alt='rock' />
      </div>
      <div className={styles.bgElipsePink}>
        <img src='images/ellipse-background-pink.png' alt='elips' />
      </div>

      <h1 className={styles.h1}>
        Mint it, prove it - <br />
        QuantumOracle.
      </h1>
      <p className={styles.p2}>
        Capture and authenticate web2 history with QuantumOracle. Verified screenshots you can trust.
      </p>
      <div className={styles.tryButton}>
        <Button title='Try it!' onClick={handleClickScroll} />
      </div>
      <div className={styles.agent}>
        <div className={styles.bgElipseBlack}></div>
        <img src='images/agent.png' alt='agent'></img>
      </div>
    </div>
  );
};

import { IHeroProps } from './HeroProps';
import styles from './Hero.module.scss';
import { Button } from 'components';
export const Hero: React.FC<IHeroProps> = () => {
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

      <h1 className={styles.h1}>Mint it, prove it - QuantumOracle.</h1>
      <p className={styles.p2}>
        With QuantumOracle, users can create verified screenshots as proof that the web content they discovered was
        legitimately served by servers at that moment .
      </p>
      <Button title='Try it!' />
      <div className={styles.agent}>
        <div className={styles.bgElipseBlack}></div>
        <img src='images/agent.png' alt='agent'></img>
      </div>
    </div>
  );
};

import { IHeroProps } from './HeroProps';
import styles from './Hero.module.scss';
import { Button } from 'components';
export const Hero: React.FC<IHeroProps> = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint it, prove it - QuantumOracle.</h1>
      <p className={styles.p2}>
        With QuantumOracle, users can create verified screenshots as proof that the web content they discovered was
        legitimately served by servers at that moment .
      </p>
      <Button title='Try it!' />
    </div>
  );
};

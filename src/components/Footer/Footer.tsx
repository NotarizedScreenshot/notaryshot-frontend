import { IFooterProps } from './FooterProps';
import styles from './Footer.module.scss';
import { Navigation } from 'components';
export const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.borderGradient} />
      <div className={styles.title}>
        <h3 className={styles.h3}>Quantum Oracle</h3>
        <p className={styles.p3}>© All rights reserved</p>
      </div>
      <Navigation />
    </div>
  );
};

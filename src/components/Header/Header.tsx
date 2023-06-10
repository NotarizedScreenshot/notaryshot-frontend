import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import { CustomConnectButton } from 'components/CustomConnectButton';
import { Navigation } from 'components/Navigation';
export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={styles.container}>
      <a href='/'>
        <h3>
          Quantum Oracle <span className={styles.version}>alpha release v1.0.0-alpha</span>
        </h3>
      </a>
      <Navigation />
      <CustomConnectButton />
    </div>
  );
};

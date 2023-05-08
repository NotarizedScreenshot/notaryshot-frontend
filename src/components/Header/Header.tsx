import { IHeaderProps } from './HeaderProps';
import styles from './Header.module.scss';
import { CustomConnectButton } from 'components/CustomConnectButton';
export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={styles.container}>
      <a href='/'>
        <h3>Quantum Oracle</h3>
      </a>
      <CustomConnectButton />
    </div>
  );
};

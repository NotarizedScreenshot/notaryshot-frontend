import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ICustomConnectButtonProps } from './CustomConnectButtonProps';
import styles from './CustomConnectButton.module.scss';

export const CustomConnectButton: React.FC<ICustomConnectButtonProps> = () => {
  return (
    <div className={styles.container}>
      <ConnectButton />
    </div>
  );
};

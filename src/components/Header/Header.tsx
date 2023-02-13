import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IHeaderProps } from './HeaderProps';
import classes from './Header.module.scss';
export const Header: React.FC<IHeaderProps> = () => {
  return (
    <div className={classes.container}>
      <ConnectButton />
    </div>
  );
};

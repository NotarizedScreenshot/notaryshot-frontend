import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Navigation } from 'components';
import { IHeaderProps } from './HeaderProps';
import classes from './Header.module.scss';
export const HeaderOld: React.FC<IHeaderProps> = () => {
  return (
    <div className={classes.container} data-testid='header'>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img alt='logo' src='/logo192.png' />
        </div>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <div className={classes.connect}>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};
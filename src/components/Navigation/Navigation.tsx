import cn from 'classnames';
import { INavigationProps } from './NavigationProps';
import classes from './Navigation.module.scss';

export const Navigation: React.FC<INavigationProps> = ({ vertical }) => {
  return (
    <div className={cn(classes.container, vertical ? classes.vertical : null)} data-testid='navigation'>
      <div className={classes.navElement}>
        <a href='https://discord.gg/YTTr2BA6DU' target='_blank' rel='noreferrer'>
          Discord
        </a>
      </div>
      <div className={classes.navElement}>
        <a href='https://github.com/NotarizedScreenshot/QuantumOracle-Docs' target='_blank' rel='noreferrer'>
          Docs
        </a>
      </div>
      <div className={classes.navElement}>
        <a href='https://github.com/NotarizedScreenshot' target='_blank' rel='noreferrer'>
          GitHub
        </a>
      </div>
      <div className={classes.navElement}>
        <a href='https://twitter.com/ChainHackerClan' target='_blank' rel='noreferrer'>
          Twitter
        </a>
      </div>
      <div className={classes.navElement}>
        <a href='mailto:hello@chainhackers.xyz' target='_blank' rel='noreferrer'>
          E-mail
        </a>
      </div>
    </div>
  );
};

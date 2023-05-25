import { INavigationProps } from './NavigationProps';
import classes from './Navigation.module.scss';

export const Navigation: React.FC<INavigationProps> = () => {
  return (
    <div className={classes.container} data-testid='navigation'>
      <div className={classes.navElement}>
        <a href='https://github.com/NotarizedScreenshot' target='_blank' rel='noreferrer'>
          Discord
        </a>
      </div>
      <div className={classes.navElement}>
        <a href='https://github.com/NotarizedScreenshot' target='_blank' rel='noreferrer'>
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
        <a href='https://github.com/NotarizedScreenshot' target='_blank' rel='noreferrer'>
          E-mail
        </a>
      </div>
    </div>
  );
};

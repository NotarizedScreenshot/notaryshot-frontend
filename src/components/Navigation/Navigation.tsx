import { INavigationProps } from './NavigationProps';
import classes from './Navigation.module.scss';
export const Navigation: React.FC<INavigationProps> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.navElement}>Home</div>
      <div className={classes.navElement}>Team</div>
      <div className={classes.navElement}>Git</div>
      <div className={classes.navElement}>App</div>
    </div>
  );
};

import { Link } from 'react-router-dom';

import { INavigationProps } from './NavigationProps';
import classes from './Navigation.module.scss';
export const Navigation: React.FC<INavigationProps> = () => {
  return (
    <div className={classes.container} data-testid='navigation'>
      <div className={classes.navElement}>
        <Link to='/'>Home</Link>
      </div>
      <div className={classes.navElement}>
        <Link to='#'>Team</Link>
      </div>
      <div className={classes.navElement}>
        <Link to='#'>Git</Link>
      </div>
      <div className={classes.navElement}>
        <Link to='/preview'>App</Link>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import cn from 'classnames';
import { INavigationProps } from './NavigationProps';
import classes from './Navigation.module.scss';
export const Navigation: React.FC<INavigationProps> = () => {
  return (
    <div className={classes.container} data-testid='navigation'>
      <div className={classes.navElement}>
        <Link to='/'>Home</Link>
      </div>
      {/* <div className={classes.navElement}>
        <Link to='#'>Team</Link>
      </div> */}
      <div className={classes.navElement}>
        <Link to='https://github.com/NotarizedScreenshot' target='_blank'>
          Git
        </Link>
      </div>
      <div className={classes.navElement}>
        <Link to='/preview'>App</Link>
      </div>
      <div className={cn(classes.navElement, classes.small)}>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

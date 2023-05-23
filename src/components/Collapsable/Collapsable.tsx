import { useState } from 'react';
import cn from 'classnames';
import styles from './Collapsable.module.scss';
import { ICollapsableProps } from './CollapsableProps';
export const Collapsable: React.FC<ICollapsableProps> = ({ title = 'Title', blocked = false, children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const clickHandler = () => {
    if (blocked) return;
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={styles.container}>
      <div className={cn(styles.heading, blocked ? styles.blocked : null)} onClick={clickHandler}>
        <h3 className={cn(styles.h3, blocked ? styles.blocked : null)}>{title}</h3>
        <svg
          className={cn(styles.icon, isCollapsed ? null : styles.rotate90)}
          width='26'
          height='26'
          viewBox='0 0 26 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M25 1L1 25M25 1H1M25 1V25' stroke='#FBFBFB' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </div>
      <div className={cn(styles.data, isCollapsed ? null : styles.show)}>{children}</div>
    </div>
  );
};

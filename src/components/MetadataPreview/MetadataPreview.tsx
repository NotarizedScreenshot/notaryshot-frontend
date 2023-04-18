import cn from 'classnames';
import { IMetadataPreviewProps } from './MetadataPreviewProps';
import styles from './MetadataPreview.module.scss';
import { useState } from 'react';
export const MetadataPreview: React.FC<IMetadataPreviewProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.heading} onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>{title}</h3>
        <svg
          className={cn(styles.icon, isCollapsed ? null : styles.rotate90)}
          width='26'
          height='26'
          viewBox='0 0 26 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M25 1L1 25M25 1H1M25 1V25' stroke='#FBFBFB' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </div>
      <div className={cn(styles.data, isCollapsed ? null : styles.show)}>{children}</div>
    </div>
  );
};

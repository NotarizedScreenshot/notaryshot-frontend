import { IMetadataPreviewProps } from './MetadataPreviewProps';
import styles from './MetadataPreview.module.scss';
export const MetadataPreview: React.FC<IMetadataPreviewProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{title}</h3>
        <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M25 1L1 25M25 1H1M25 1V25' stroke='#FBFBFB' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </div>
      {children}
    </div>
  );
};

import cn from 'classnames';
import { IProcessActionProps } from './ProcessActionProps';
import styles from './ProcessAction.module.scss';
export const ProcessAction: React.FC<IProcessActionProps> = ({ children, iconImageUrl, personTitle }) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.description, iconImageUrl ? styles.pictured : null)}>{children}</div>
      {iconImageUrl && (
        <div className={styles.person}>
          <div className={styles.userpic}>
            <img className={styles.image} alt='userpic' src={iconImageUrl} />
          </div>
          {personTitle && <div className={styles.title}>{personTitle}</div>}
        </div>
      )}
    </div>
  );
};

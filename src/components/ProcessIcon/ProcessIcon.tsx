import { IProcessIconProps } from './ProcessIconProps';
import styles from './ProcessIcon.module.scss';
export const ProcessIcon: React.FC<IProcessIconProps> = ({ title = 'title', iconURL }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src='images/glow.png' alt='glow' className={styles.glow} />
        {iconURL && <img src={iconURL} alt='icon-dns'></img>}
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

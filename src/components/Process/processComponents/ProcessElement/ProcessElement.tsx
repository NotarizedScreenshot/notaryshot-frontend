import { IProcessElementProps } from './ProcessElementProps';
import styles from './ProcessElement.module.scss';
export const ProcessElement: React.FC<IProcessElementProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>{title}</h3>
    </div>
  );
};

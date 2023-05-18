import { ICircledNumberProps } from './CircledNumberProps';
import styles from './CircledNumber.module.scss';
export const CircledNumber: React.FC<ICircledNumberProps> = ({ number = 0 }) => {
  return <div className={styles.container}>{number}</div>;
};

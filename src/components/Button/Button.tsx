import { IButtonProps } from './ButtonProps';
import styles from './Button.module.scss';
export const Button: React.FC<IButtonProps> = ({ title = 'Button' }) => {
  return <button className={styles.button}>{title}</button>;
};

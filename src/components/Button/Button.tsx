import { IButtonProps } from './ButtonProps';
import styles from './Button.module.scss';
export const Button: React.FC<IButtonProps> = ({ title = 'Button', onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

import { ITransactionStatusProps } from './TransactionStatusProps';
import styles from './TransactionStatus.module.scss';
export const TransactionStatus: React.FC<ITransactionStatusProps> = ({ statusValue }) => {
  return <div className={styles.container}>{statusValue}</div>;
};

import { IModalProps } from './ModalProps';
import styles from './Modal.module.scss';
import { EModalDialogTypes, useModalContext } from 'contexts';
import { memo } from 'react';
import { Preloader, TransactionStatus } from 'components';

const renderComponent = (
  modalType: EModalDialogTypes,
  data: {
    transactionStatus: null | string;
  } | null,
) => {
  switch (modalType) {
    case EModalDialogTypes.transaction:
      return <TransactionStatus statusValue={data!.transactionStatus} />;
    case EModalDialogTypes.preloader:
      return <Preloader />;
    default:
      return <div>{data?.transactionStatus}</div>;
  }
};

export const Modal: React.FC<IModalProps> = memo(({ children }) => {
  const { modalType, data } = useModalContext();

  return <div className={styles.container}>{modalType !== null ? renderComponent(modalType, data) : children}</div>;
});

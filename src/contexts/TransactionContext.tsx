import { createContext, useCallback, useContext, useState } from 'react';

interface ITransactionContextValue {
  transactionStatus: null | 'fail' | 'success';
  transactionId: null | string;
  setTransactionStatus: React.Dispatch<React.SetStateAction<'fail' | 'success' | null>>;
  setTransactionId: React.Dispatch<React.SetStateAction<string | null>>;
  resetTransactionStatus: () => void;
}

const transactionContextInitialValue: ITransactionContextValue = {
  transactionStatus: null,
  transactionId: null,
  setTransactionId: () => undefined,
  setTransactionStatus: () => undefined,
  resetTransactionStatus: () => undefined,
};

export const TransactionContext = createContext(transactionContextInitialValue);

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactionStatus, setTransactionStatus] = useState<ITransactionContextValue['transactionStatus']>(
    transactionContextInitialValue.transactionStatus,
  );
  const [transactionId, setTransactionId] = useState<ITransactionContextValue['transactionId']>(
    transactionContextInitialValue.transactionId,
  );

  const resetTransactionStatus = useCallback(() => {
    setTransactionStatus(transactionContextInitialValue.transactionStatus);
    setTransactionId(transactionContextInitialValue.transactionId);
  }, []);

  const value: ITransactionContextValue = {
    transactionId,
    transactionStatus,
    setTransactionId,
    setTransactionStatus,
    resetTransactionStatus,
  };
  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

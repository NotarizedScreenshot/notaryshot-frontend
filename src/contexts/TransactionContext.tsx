import { createContext, useCallback, useContext, useState } from 'react';

interface ITransactionContextValue {
  transactionStatus: null | 'fail' | 'success';
  transactionId: null | string;
  setTransactionStatus: React.Dispatch<React.SetStateAction<'fail' | 'success' | null>>;
  setTransactionId: React.Dispatch<React.SetStateAction<string | null>>;
  resetTransactionStatus: () => void;
  nftId: string | null;
  setNftId: React.Dispatch<React.SetStateAction<string | null>>;
}

const transactionContextInitialValue: ITransactionContextValue = {
  transactionStatus: null,
  transactionId: null,
  setTransactionId: () => undefined,
  setTransactionStatus: () => undefined,
  resetTransactionStatus: () => undefined,
  nftId: null,
  setNftId: () => undefined,
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
  const [nftId, setNftId] = useState<string | null>(null);

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
    nftId,
    setNftId,
  };
  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

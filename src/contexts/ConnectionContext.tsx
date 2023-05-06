import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from 'index';
export interface IConnectionContextValue {
  isConnected: boolean;
  userId: string | null;
}

const initialValue: IConnectionContextValue = {
  isConnected: false,
  userId: null,
};

export const ConnectionContext = createContext<IConnectionContextValue>(initialValue);

export const useConnectionContext = () => useContext(ConnectionContext);

export const ConnectionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(initialValue.isConnected);
  const [userId, setUserId] = useState<string | null>(initialValue.userId);
  const value: IConnectionContextValue = {
    isConnected,
    userId,
  };

  useEffect(() => {
    socket.on('connected', (socketId) => {
      console.log('received socket id:', socketId);

      const savedUserId = window.localStorage.getItem('qoUserId');

      if (!savedUserId) {
        window.localStorage.setItem('qoUserId', socketId);
        console.log('new user id saved');
      }

      socket.emit('userIdSaved', savedUserId ? savedUserId : socketId);
      setUserId(savedUserId ? savedUserId : socketId);
      setIsConnected(true);
    });
  }, []);

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

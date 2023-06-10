import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from 'index';
export interface IConnectionContextValue {
  isConnected: boolean;
  connectionError: string | null;
  userId: string | null;
}

const initialValue: IConnectionContextValue = {
  isConnected: false,
  connectionError: null,
  userId: null,
};

export const ConnectionContext = createContext<IConnectionContextValue>(initialValue);

export const useConnectionContext = () => useContext(ConnectionContext);

export const ConnectionContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isConnected, setIsConnected] = useState<boolean>(initialValue.isConnected);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(initialValue.userId);
  const value: IConnectionContextValue = {
    isConnected,
    connectionError,
    userId,
  };

  useEffect(() => {
    socket.on('connected', (socketId) => {
      setConnectionError(null);
      console.log('received socket id:', socketId);

      const savedUserId = window.sessionStorage.getItem('qoUserId');

      if (!savedUserId) {
        window.sessionStorage.setItem('qoUserId', socketId);
        console.log('new user id saved');
      }

      socket.emit('userIdSaved', savedUserId ? savedUserId : socketId);
      setUserId(savedUserId ? savedUserId : socketId);
      setIsConnected(true);
    });
    socket.on('connect_error', (err) => {
      console.error(`Websocket connect error due to ${err.message}`);
      setConnectionError(`Server connection failed: ${err.message}`);
    });
  }, []);

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>;
};

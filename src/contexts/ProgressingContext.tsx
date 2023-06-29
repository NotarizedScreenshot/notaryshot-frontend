import { socket } from 'index';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface IProgressingContextValue {
  progress: number;
  inProgress: boolean;
  setInProgress: (isInProgress: boolean) => void;
  setProgress: (progress: number) => void;
  contentId: {
    metadataToSaveCid: string;
    screenshotCid: string;
    stampedScreenShotCid: string;
    nftMetadataCid: string;
    mediaCidMap: { url: string; cid: string | null; error?: string }[];
  } | null;
}

export const progressingContextInitialValue: IProgressingContextValue = {
  progress: 0,
  inProgress: false,
  setInProgress: () => undefined,
  setProgress: () => undefined,
  contentId: null,
};

export const ProgressingContext = createContext<IProgressingContextValue>(progressingContextInitialValue);

export const useProgressingContext = () => useContext(ProgressingContext);

export const ProgressingContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [progressValue, setProgressValue] = useState<IProgressingContextValue>(progressingContextInitialValue);

  const setInProgress = useCallback((inProgress: boolean) => {
    setProgressValue((prev) => ({ ...prev, inProgress }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    setProgressValue((prev) => ({ ...prev, progress }));
  }, []);

  useEffect(() => {
    if (progressValue.progress === 0) setProgressValue((prev) => ({ ...prev, contentId: null }));
  }, [progressValue.progress]);

  useEffect(() => {
    socket.on('uploadProgress', (message) => {
      setProgressValue((prev) => ({ ...prev, progress: message }));
    });

    socket.on('uploadComplete', (message) => {
      setTimeout(
        () => setProgressValue((prev) => ({ ...prev, inProgress: false, contentId: { ...JSON.parse(message) } })),
        1500,
      );
    });
  }, []);

  return (
    <ProgressingContext.Provider value={{ ...progressValue, setInProgress, setProgress }}>
      {children}
    </ProgressingContext.Provider>
  );
};

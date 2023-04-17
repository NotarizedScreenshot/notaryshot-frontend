// import { socket } from 'index';
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { socket } from 'index';
export interface IPreviewHash {
  previewImageHash: string | null;
  previewStampedImageHase: string | null;
  metadataToSaveCid: string | null;
  mediaHash: {
    url: string;
    cid: string | null;
    error?: string | undefined;
  }[];
}

const initialHashesValue: IPreviewHash = {
  previewImageHash: null,
  previewStampedImageHase: null,
  metadataToSaveCid: null,
  mediaHash: [],
};

export const PreviewContext = createContext<{
  hashes: IPreviewHash;
  setHashes: Dispatch<SetStateAction<IPreviewHash>>;
}>({ hashes: initialHashesValue, setHashes: () => undefined });

export const usePreviewContext = () => useContext(PreviewContext);

export const PreviewContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hashes, setHashes] = useState<IPreviewHash>(initialHashesValue);
  console.log('context hashes', hashes);

  useEffect(() => {
    // const socket = io();

    // socket.on('uploadComplete', (message) => {
    //   console.log('upload complete');
    //   const { mediaCidMap, screenshotCid, stampedScreenShotCid, metadataToSaveCid } = JSON.parse(message) as {
    //     mediaCidMap: {
    //       url: string;
    //       cid: string | null;
    //       error?: string | undefined;
    //     }[];
    //     screenshotCid: string;
    //     stampedScreenShotCid: string;
    //     metadataToSaveCid: string;
    //   };

    //   console.log('upload complete message', JSON.parse(message));
    //   // setHashes({
    //   //   previewImageHash: screenshotCid,
    //   //   previewStampedImageHase: stampedScreenShotCid,
    //   //   mediaHash: mediaCidMap,
    //   //   metadataToSaveCid,
    //   // });
    // });

    return () => {
      // socket.close();
    };
  });

  const value = {
    hashes,
    setHashes,
  };

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
};

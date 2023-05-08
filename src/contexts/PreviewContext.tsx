import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

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
  tweetId: string | null;
  setTweetId: Dispatch<SetStateAction<string | null>>;
}>({ hashes: initialHashesValue, setHashes: () => undefined, tweetId: null, setTweetId: () => undefined });

export const usePreviewContext = () => useContext(PreviewContext);

export const PreviewContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hashes, setHashes] = useState<IPreviewHash>(initialHashesValue);
  const [tweetId, setTweetId] = useState<string | null>(null);

  const value = {
    hashes,
    setHashes,
    tweetId,
    setTweetId,
  };

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
};

import { IMetadata } from 'types';
import { metadataStub1 } from '__fixtures__/metadata';

export const fetchMetadataById = async (tweetId: string): Promise<IMetadata> => {
  //TODO: add metadata fetcher
  return new Promise((res) => {
    setTimeout(() => res(metadataStub1), 2000);
  });
};

export const fetchPreviewImageByID = async (tweetId: string): Promise<string> => {
  //TODO: add preview image fetcher
  return new Promise((res) => {
    setTimeout(() => res('screenshot-sample-1.png'), 1000);
  });
};

export const submitNotarization = async (tweetId: string) => {
  //TODO: add notarization handler
  return new Promise((res) => {
    setTimeout(() => res(true), 1000);
  });
};

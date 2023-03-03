import { IMetadata } from 'types';
import { metadataStub1 } from '__fixtures__/metadata';

export const fetchMetadataById = async (tweetId: string): Promise<IMetadata> => {
  //TODO: add metadata fetcher
  // console.log('run fetch');
  return new Promise((res, rej) => {
    setTimeout(() => rej(new Error('Failed to fetch metadata')), 3000);
    setTimeout(() => res(metadataStub1), 1000);
  });
};

export const fetchPreviewImageByID = async (tweetId: string): Promise<string> => {
  //TODO: add preview image fetcher
  return new Promise((res, rej) => {
    // setTimeout(() => rej(new Error('Failed to fetch image')), 1500);
    setTimeout(() => res('screenshot-sample-1.png'), 500);
  });
};

export const submitNotarization = async (tweetId: string) => {
  //TODO: add notarization handler
  return new Promise((res) => {
    setTimeout(() => res(true), 1000);
  });
};

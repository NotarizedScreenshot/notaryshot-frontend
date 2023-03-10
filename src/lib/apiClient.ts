import { IMetadata, ITweetData } from 'types';

export const fetchMetadataById = async (tweetId: string): Promise<IMetadata | null> => {
  try {
    const response = await fetch(`/metaData?tweetId=${tweetId}`);
    if (!response.ok) {
      throw new Error('Error when fetching tweet data');
    }
    return await response.json();
  } catch (error) {
    console.error('fetchTweetDatabyId error', error);
    return null;
  }
};

export const fetchTweetDatabyId = async (tweetId: string): Promise<ITweetData | null> => {
  try {
    const response = await fetch(`/tweetData?tweetId=${tweetId}`);
    if (!response.ok) {
      throw new Error('Error when fetching tweet data');
    }
    return await response.json();
  } catch (error) {
    console.error('fetchTweetDatabyId error', error);
    return null;
  }
};

export const fetchPreviewImageByID = async (tweetId: string): Promise<Blob | null> => {
  try {
    const response = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweetId }),
    });
    if (!response.ok) {
      throw new Error('Error when fetching image');
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.log('fetching error image', error);
    return null;
  }
};

export const fetchPreviewDataByTweetId = async (tweetId: string) => {
  try {
    const imageBlob = await fetchPreviewImageByID(tweetId);
    if (!imageBlob) {
      return null;
    }
    const metaData = await fetchMetadataById(tweetId);
    const tweetData = await fetchTweetDatabyId(tweetId);

    return { imageBlob, metaData, tweetData };
  } catch (error) {
    console.error('fetchPreviewData error', error);
    return null;
  }
};

export const submitNotarization = async (tweetId: string) => {
  //TODO: add notarization handler
  return new Promise((res) => {
    setTimeout(() => res(true), 1000);
  });
};
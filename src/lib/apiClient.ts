import { fetchSigner } from '@wagmi/core';
import { Contract, ContractReceipt } from 'ethers';
import { IMetadata } from 'types';

import notaryShotContract from 'contracts/screenshot-manager.json';

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

export const fetchTweetDatabyId = async (tweetId: string): Promise<any | null> => {
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

export const fetchPreviewDataByTweetId = async (tweetId: string, userId?: string | null) => {
  try {
    // const imageBlob = await fetchPreviewImageByID(tweetId);
    // const imageBuffer = await imageBlob!.arrayBuffer();
    // if (!imageBlob) {
    // return null;
    // }
    // const metaData = await fetchMetadataById(tweetId);
    // const tweetData = await fetchTweetDatabyId(tweetId);

    const response = await fetch(`/previewData?tweetId=${tweetId}&userId=${userId}`);
    // const { imageUrl, tweetdata, metadata } = await response.json();

    // return { imageBlob, metaData, tweetData, imageBuffer };
    return await response.json();
  } catch (error) {
    console.error('fetchPreviewData error', error);
    return null;
  }
};

export const submitNotarization = async (
  tweetId: string,
  trustedHashSumBigIng: string,
): Promise<ContractReceipt | { status: 'failed' | 'success'; error?: Error | string | null }> => {
  try {
    const signer = await fetchSigner();
    if (!signer) throw new Error('cant get signer');
    const contract = new Contract(notaryShotContract.address, notaryShotContract.abi, signer);

    // contract.on()
    const transaction = await contract.submitMint(tweetId, trustedHashSumBigIng);
    const receipt: ContractReceipt = await transaction.wait();
    console.log(receipt);

    // contract.on('RequestContentHashSent', (...args) => {
    //   console.log('on RequestContentHashSent');
    //   console.log('args', args);
    // });
    // contract.on('Transfer', (...args) => {
    // console.log('on Transfer');
    // console.log('args', args);
    // console.log(args[2]);
    // const x = args[2] as BigInt;
    // console.log(x.toString());
    // });
    // contract.on('ChainlinkRequested', (...args) => {
    //   console.log('on ChainlinkRequested');
    //   console.log('args', args);
    // });

    return receipt;
  } catch (error) {
    console.error(error);
    return { status: 'failed', error: error instanceof Error ? error.message : String(error) };
  }
};

export const fetchResults = async (metaDataCid: string) => {
  try {
    const response = await fetch(`https://ipfs.io/ipfs/${metaDataCid}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('fetchResults', error);
    return null;
  }
};

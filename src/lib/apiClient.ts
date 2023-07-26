// import { fetchSigner } from '@wagmi/core';
// import { Contract, ContractReceipt } from 'ethers';
import { IFetchedData, IMetadata } from 'types';
import { writeContract } from '@wagmi/core';

import notaryShotContract from 'contracts/screenshot-manager.json';

const DEFAULT_REQUEST_TIMEOUT_MS = 120000;

export const fetchMetadataById = async (tweetId: string): Promise<IMetadata | null> => {
  try {
    const response = await fetch(`/metaData?tweetId=${tweetId}`);
    if (!response.ok) {
      throw new Error('Error when fetching tweet data');
    }
    return await response.json();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
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
  } catch (error: any) {
    console.log('fetching error image', error);
    return null;
  }
};

export const fetchPreviewDataByTweetId = async (
  tweetId: string,
  userId?: string | null,
): Promise<IFetchedData | null> => {
  const abortcontroller = new AbortController();
  const tiemoutId = setTimeout(() => abortcontroller.abort(), DEFAULT_REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`/previewData?tweetId=${tweetId}&userId=${userId}`, {
      signal: abortcontroller.signal,
    });

    clearInterval(tiemoutId);

    if (response.status !== 200) return null;

    return await response.json();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('fetchPreviewData error', error);
    return null;
  }
};

export const submitNotarization = async (
  tweetId: string,
  cid: string,
  cb?: (data: string) => void,
): Promise<{ status: 'failed' | 'success'; transactionHash?: string | null; error?: string | null }> => {
  try {
    const bg = BigInt(tweetId);
    const { hash } = await writeContract({
      address: notaryShotContract.address as `0x${string}`,
      abi: notaryShotContract.abi,
      functionName: 'submitTweetMint',
      args: [bg, cid],
    });

    const splitHash = hash.split('');
    splitHash.splice(6, splitHash.length - 6 * 2, '...');

    if (!!cb) {
      cb(`Trasaction ${splitHash.join('')} confirmed, waiting for receipt...`);
    }

    return { status: 'success', transactionHash: hash, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('submit notarization error', error);
      return { status: 'failed', error: error.message };
    }
    return { status: 'failed', error: JSON.stringify(error) };
  }
};

export const fetchResults = async (metaDataCid: string) => {
  try {
    const storageGateway = process.env.REACT_APP_STORAGE_GATEWAY;
    if (!storageGateway) throw new Error(`No storage gateway address, REACT_APP_STORAGE_GATEWAY = ${storageGateway}`);
    const response = await fetch(`${process.env.REACT_APP_STORAGE_GATEWAY}${metaDataCid}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('fetchResults', error);
    return null;
  }
};

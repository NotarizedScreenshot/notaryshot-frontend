import { fetchSigner } from '@wagmi/core';
import { Contract, ContractReceipt } from 'ethers';
import { IFetchedData, IMetadata } from 'types';

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
  cb?: (data: string) => void,
): Promise<
  // TODO: https://github.com/orgs/NotarizedScreenshot/projects/1/views/1?filterQuery=typ&pane=issue&itemId=28111890
  ContractReceipt | { status: 'failed' | 'success'; transactionHash?: string | null; error?: string | null }
> => {
  try {
    const signer = await fetchSigner();
    if (!signer) throw new Error('cant get signer');
    const contract = new Contract(notaryShotContract.address, notaryShotContract.abi, signer);

    const transaction = await contract.submitTweetMint(tweetId);

    if (!!cb) {
      cb(`Trasaction ${transaction.hash} confirmed, waiting for receipt...`);
    }

    const receipt: ContractReceipt = await transaction.wait();

    return receipt;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('submit notarization error', error);
    return { status: 'failed', error: error.reason };
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

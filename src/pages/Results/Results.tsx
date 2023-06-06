import { IResultsProps } from './ResultsProps';
import styles from './Results.module.scss';
import { Header, TweetIdForm, TweetResults, MetadataPreview, HTTPMetadata, DNSMetadata } from 'components';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFetchingContext } from 'contexts';
import { fetchSigner } from '@wagmi/core';
import { BigNumber, Contract } from 'ethers';
import notaryShotContract from 'contracts/screenshot-manager.json';
import { useAccount } from 'wagmi';

export const Results: React.FC<IResultsProps> = memo(() => {
  const [nftId, setNftId] = useState<string>();
  const { address } = useAccount();
  const testContract = useCallback(async () => {
    try {
      const signer = await fetchSigner();
      if (!signer) throw new Error('cant get signer');
      const contract = new Contract(notaryShotContract.address, notaryShotContract.abi, signer);

      contract.on('Transfer', (...args) => {
        const [, ownerAddress, mintedNftId] = args as [string, string, BigNumber];

        if (ownerAddress.toLowerCase() === address?.toLowerCase()) {
          setNftId(mintedNftId.toString());
        }
      });
    } catch (error) {
      console.log('error in testContract', error);
    }
  }, []);

  useEffect(() => {
    'run useEffect in result';
    testContract();
  }, []);

  const { data, tweetId } = useFetchingContext();
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TweetIdForm />
        {data && (
          <>
            <div className={styles.bgCircles}></div>
            <div className={styles.spy}>
              <img src='/images/spy.png' alt='spy'></img>
            </div>
            <div className={styles.message}>
              <div className={styles.text}>Great! Your NFT is notarized! Now you have invincible evidence!</div>
            </div>
            <div className={styles.title}>
              <h2 className={styles.h2}>Tweet verified!</h2>
              <p className={styles.p3}>{`id: ${tweetId}`}</p>
            </div>
            <TweetResults imageUrl={data.imageUrl} tweetdata={data.tweetdata} tweetId={tweetId} nftId={nftId} />
            <MetadataPreview
              blocked={!data.metadata}
              title={`Http headers meta${!data.metadata ? ': data unavailable' : ''}`}
            >
              {data.metadata && <HTTPMetadata metadata={data.metadata} />}
            </MetadataPreview>
            <MetadataPreview
              blocked={!data.metadata}
              title={`DNS headers meta${!data.metadata ? ': data unavailable' : ''}`}
            >
              {data.metadata && <DNSMetadata metadata={data.metadata} />}
            </MetadataPreview>
          </>
        )}
      </main>
    </div>
  );
});

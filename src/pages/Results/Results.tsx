import { IResultsProps } from './ResultsProps';
import classes from './Results.module.scss';
import { HeaderOld, ImagePreview, Notarize, TweetInfo, NFTInfo, MetadataInfo, DNSMetadataInfo } from 'components';
import { memo, useEffect, useState } from 'react';

import { IMetadata, ITweetData } from 'types';
import { fetchResults } from 'lib/apiClient';

import { getTrustedHashSum } from 'utils';
import { Glitch } from 'components/Glitch';

import { Contract } from 'ethers';
// import { IMetadata } from 'types';

import { fetchSigner } from '@wagmi/core';

import notaryShotContract from 'contracts/screenshot-manager.json';

export const Results: React.FC<IResultsProps> = memo(() => {
  const [tweetId, setTweetId] = useState<string | null>(new URLSearchParams(document.location.search).get('tweetid'));
  const [notarizedData, setNotarizedData] = useState<{ [id: string]: string } | null>(null);
  const [watermarkedScreenshotCid, setwatermarkedScreenshotCid] = useState<string | null>(null);
  const [watermarkedScreenshotUrl, setwatermarkedScreenshotUrl] = useState<string | null>(null);
  const [isLoadingScreenshot, setIsLoadingScreenshot] = useState<boolean>(true);
  const [qrCodeData, setQrCodeData] = useState<{
    trustedHashSum: string;
    tweetId: string;
    metadataHash: string;
    previewImageHash: string;
    tweetDataHash: string;
  } | null>(null);

  const [media, setMedia] = useState<{ src: string; cid: string }[] | null>(null);

  const [parsedTweetData, setParsedTweetData] = useState<ITweetData | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);

  const [isFettingResults, setIsFetchingResults] = useState<boolean>(true);
  const [nftHashSum, setNftHashSum] = useState<string | null>(null);
  // console.log(tweetId);

  // const parsedTweetData = data1.finalData.parsedTweetData as ITweetData;
  // const media = data1.finalData.media as { src: string; cid: string }[];
  // const metadata = data1.finalData.metadata;

  //TODO: change to actual
  // const hashSUm = '24253786503100722540983614787276281249539409365738449173898742294822468658622';

  // 1634098418095095810;
  // bafkreidddpqqmd22ectsv6qpsusdbkdfm4lyzop7hpowywzlwwl6ozomeu

  fetchSigner().then((signer) => {
    if (!signer) {
      console.log('no signer');
      return;
    }
    console.log('has signer');
    const contract = new Contract(notaryShotContract.address, notaryShotContract.abi, signer);

    // contract.on()
    // const transaction = await contract.submitMint(tweetId, trustedHashSumBigIng);
    // const receipt: ContractReceipt = await transaction.wait();
    // console.log(receipt);

    contract.on('RequestContentHashSent', (...args) => {
      // console.log('on RequestContentHashSent');
      // console.log('args', args);
    });
    contract.on('Transfer', (...args) => {
      console.log('on Transfer results');
      console.log('args', args);
      console.log('args', args);
      console.log(args[2]);
      const x = args[2] as BigInt;
      console.log(x.toString());
      setNftHashSum(x.toString());
    });
    contract.on('ChainlinkRequested', (...args) => {
      // console.log('on ChainlinkRequested');
      // console.log('args', args);
    });
  });

  useEffect(() => {
    fetchResults('bafkreigvaz5lobdenten66j64jdu7el6f5o2zj2ddfqesxvghjbvngmyia').then((data) => {
      // console.log('data', data);
      // console.log('data1', data1);
      setNotarizedData(data);

      if (data) {
        setwatermarkedScreenshotCid(data.finalData.watermarkedScreenshot.cid);
        setParsedTweetData(data.finalData.parsedTweetData);
        setMedia(data.finalData.media);
        setMetadata(data.finalData.metadata);
        setTweetId(data.url);
      }
      const dataForTrustedHashSum = {
        screenShotHash: data.finalData.watermarkedScreenshot.cid.hash,
        tweetRawData: data.finalData.tweetRawData,

        parsedTweetData: data.finalData.parsedTweetData,
        metaData: data.finalData.metadata,
      };
      const trustedHashSum = getTrustedHashSum(JSON.stringify(dataForTrustedHashSum));
      const metadataHashSum = getTrustedHashSum(JSON.stringify(data.finalData.metadata));
      const proccessedTweetDataHashSum = getTrustedHashSum(JSON.stringify(data.parsedTweetData));
      // console.log(trustedHashSum);
      // console.log(BigInt('0x' + trustedHashSum).toString());
      const qrCodeData: {
        trustedHashSum: string;
        tweetId: string;
        metadataHash: string;
        previewImageHash: string;
        tweetDataHash: string;
      } = {
        trustedHashSum,
        tweetId: data.url,
        metadataHash: metadataHashSum,
        previewImageHash: data.finalData.watermarkedScreenshot.cid.hash,
        tweetDataHash: proccessedTweetDataHashSum,
      };
      // console.log(qrCodeData);
      setQrCodeData(qrCodeData);
    });
  }, []);

  useEffect(() => {
    if (!!watermarkedScreenshotCid)
      fetch(`https://ipfs.io/ipfs/${watermarkedScreenshotCid}`)
        .then((response) => response.blob())
        .then((blob) => {
          setwatermarkedScreenshotUrl(URL.createObjectURL(blob));
        })
        .catch((error) => {
          console.error('failed to load screenshot', error);
        })
        .finally(() => {
          setIsLoadingScreenshot(false);
        });
  }, [watermarkedScreenshotCid]);

  useEffect(() => {}, [notarizedData]);

  // const [glitchComplete, setGlitchCompelte] = useState<boolean>(false);
  // const [finishFun, setFinishfun] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsFetchingResults(false);
    }, 15000);
  }, []);

  return (
    <div className={classes.container}>
      {isFettingResults && <Glitch />}
      <HeaderOld />
      <div className={classes.content}>
        <h1 className={classes.h1}>Quantum oracle</h1>
        {/* TODO: make form working */}
        {/* <div className={classes.requestForm}>
          <TwitterIdForm onSubmit={submitCheckHandler} inline initialInputData={tweetId} validate={validateBigInt} />
        </div> */}
        <div className={classes.imagePreview}>
          {isLoadingScreenshot && <div className={classes.loading}>Loading...</div>}

          {!isLoadingScreenshot && <ImagePreview image={watermarkedScreenshotUrl} qrData={qrCodeData} />}
        </div>
        <div className={classes.notarize}>
          <Notarize />
        </div>

        <div className={classes.tweetInfo}>
          {parsedTweetData && media && tweetId && <TweetInfo data={parsedTweetData} media={media} tweetId={tweetId} />}
        </div>
        <div className={classes.nftInfo}>
          <NFTInfo id={nftHashSum} />
        </div>
        {metadata && (
          <div className={classes.metadataInfo}>
            <MetadataInfo data={metadata} />
          </div>
        )}
        {metadata && (
          <div className={classes.dnsInfo}>
            <DNSMetadataInfo data={metadata} />
          </div>
        )}
      </div>
    </div>
  );
});

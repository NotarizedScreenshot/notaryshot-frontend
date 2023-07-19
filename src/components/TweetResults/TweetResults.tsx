import { ITweetResultsProps } from './TweetResultsProps';
import styles from './TweetResults.module.scss';
import {
  NotarizeButton,
  ScreenshotPreview,
  TweetAttributes,
  TweetAuthor,
  TweetDate,
  TweetMedia,
  TweetStats,
  TweetTime,
  ViewNFTButton,
} from './components';
import { useEffect, useState } from 'react';
import { ITweetAttributes, ITweetBody, ITweetDetails, ITweetUser } from 'types';
import { GatewayLink } from 'components/GatewayLink';
import { useProgressingContext, useTransactionContext } from 'contexts';
import { createBrowserHistory } from 'history';

export const TweetResults: React.FC<ITweetResultsProps> = ({ imageUrl, tweetdata, tweetId, nftId }) => {
  const [user, setUser] = useState<ITweetUser | null>(null);
  const [details, setDetails] = useState<ITweetDetails | null>(null);
  const [attributes, setAttributes] = useState<ITweetAttributes | null>(null);
  const [body, setBody] = useState<ITweetBody | null>(null);
  const [media, setMedia] = useState<ITweetBody['media'] | null>(null);

  const { transactionStatus, transactionId } = useTransactionContext();

  useEffect(() => {
    if (!!tweetdata) {
      setUser(tweetdata.user);
      setDetails(tweetdata.details);
      setBody(tweetdata.body);
      const { hashtags, urls, user_mentions, media: bodyMedia } = tweetdata.body;
      setAttributes((prev) => (!hashtags && !urls && !user_mentions ? prev : { hashtags, urls, user_mentions }));
      setMedia(bodyMedia);
    }
  }, [tweetdata]);

  const date = new Date(details ? details.created_at : Date.now());

  const { contentId } = useProgressingContext();

  useEffect(() => {
    if (!!tweetId && !!contentId?.nftMetadataCid) {
      const history = createBrowserHistory();
      history.replace(`/preview?${!transactionStatus ? `tweetid=${tweetId}&` : ''}cid=${contentId?.nftMetadataCid}`);
    }
  }, [tweetId, contentId]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ScreenshotPreview imageUrl={imageUrl!} />
        <div className={styles.heading}>
          {!!user && <TweetAuthor {...user} />}
          <TweetTime date={date} />
          <TweetDate date={date} />
        </div>
        <div className={styles.text}>{body ? body.full_text : 'Tweet text unavailable'}</div>
        <div className={styles.glow}>
          <img src='/images/glow-1.png' alt='glow' />
        </div>
        {attributes && Object.values(attributes).some((el) => !!el && el.length > 0) && (
          <TweetAttributes attributes={attributes} />
        )}
        {details && <TweetStats {...details} />}
        {transactionStatus && transactionId && contentId && (
          <GatewayLink cid={contentId.metadataToSaveCid} title={`tweet ${tweetId} data`} />
        )}
        {media && media.length > 0 && <TweetMedia media={media} />}
      </div>
      {!!tweetdata && (
        <>
          {transactionStatus && transactionId ? <ViewNFTButton nftId={nftId} /> : <NotarizeButton tweetId={tweetId} />}
        </>
      )}
    </div>
  );
};

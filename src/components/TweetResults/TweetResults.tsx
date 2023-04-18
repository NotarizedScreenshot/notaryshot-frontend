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
} from './components';
import { useEffect, useState } from 'react';
import { ITweetAttributes, ITweetBody, ITweetDetails, ITweetUser } from 'types';

export const TweetResults: React.FC<ITweetResultsProps> = ({ imageUrl, tweetdata }) => {
  const [user, setUser] = useState<ITweetUser | null>(null);
  const [details, setDetails] = useState<ITweetDetails | null>(null);
  const [attributes, setAttributes] = useState<ITweetAttributes | null>(null);
  const [body, setBody] = useState<ITweetBody | null>(null);
  const [media, setMedia] = useState<ITweetBody['media'] | null>(null);

  useEffect(() => {
    if (!!tweetdata) {
      setUser(tweetdata.user);
      setDetails(tweetdata.details);
      setBody(tweetdata.body);
      const { hashtags, urls, user_mentions, media } = tweetdata.body;
      setAttributes({ hashtags, urls, user_mentions });
      setMedia(media);
    }
  }, [tweetdata]);

  const date = new Date(details ? details.created_at : Date.now());

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
        {attributes && <TweetAttributes attributes={attributes} />}
        {details && <TweetStats {...details} />}
        {media && media.length > 0 && <TweetMedia media={media} />}
      </div>
      <NotarizeButton />
    </div>
  );
};

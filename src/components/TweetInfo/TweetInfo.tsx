import cn from 'classnames';
import { ITweetInfoProps } from './TweetInfoProps';
import classes from './TweetInfo.module.scss';
import { memo, useEffect, useState } from 'react';

import { ITweetData } from 'types';
export const TweetInfo: React.FC<ITweetInfoProps> = memo(({ data, media, tweetId }) => {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [mediaElements, setMediaElements] = useState<
    { cid: string; src: string; imageUrl: string; type: string }[] | null
  >(null);

  const { user, body, details } = data as ITweetData;
  const { hashtags, symbols, urls, card, user_mentions } = body;
  const userPhotoCID = media.find((el) => el.src === user?.profile_image_url_https)?.cid;

  useEffect(() => {
    if (!!userPhotoCID) {
      fetch(`https://ipfs.io/ipfs/${userPhotoCID}`)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setUserImageUrl(objectURL);
        });
    }
    if (!!body.media) {
      const mediaWithUrls = body.media.map((mediaEl) => {
        const cid = media.find((el) => el.src === mediaEl.src)?.cid;
        return { ...mediaEl, cid };
      });

      Promise.all(
        mediaWithUrls.map((mediaEl) => {
          return fetch(`https://ipfs.io/ipfs/${mediaEl.cid}`)
            .then((response) => response.blob())
            .then((blob) => ({ ...mediaEl, imageUrl: URL.createObjectURL(blob) }))
            .catch((error) => error.message);
        }),
      )
        .then(setMediaElements)
        .catch((error) => console.error(error.message));
    }
  }, [userPhotoCID, body.media, body, media]);

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Tweet info</h1>
      <div className={classes.element}>
        <div className={classes.h3}>
          Original Tweet URL:{' '}
          <a
            href={`https://twitter.com/twitter/status/${tweetId}`}
            target='_blank'
            rel='noreferrer'
          >{`https://twitter.com/twitter/status/${tweetId}`}</a>
        </div>
      </div>

      <div className={classes.data}>
        <div className={classes.element}>
          <div className={classes.h3}>User</div>
          <div className={classes.content}>
            <div className={classes.userImage}>{userImageUrl && <img src={userImageUrl} alt='user img'></img>}</div>
            <div className={classes.userInfo}>
              <div className={classes.name}>{user.name}</div>
              <div className={classes.loginName}>@{user.screen_name}</div>
            </div>
          </div>
        </div>
        <div className={classes.element}>
          <div className={classes.h3}>Text</div>
          <div className={cn(classes.content, classes.text)}>{body.full_text}</div>
        </div>
        {!!details &&
          Object.entries(details).map((detail: any[], index: number) => {
            return (
              <div className={classes.element} key={detail[0] + String(index)}>
                <div className={classes.h3}>{detail[0]}</div>
                {detail[1]}
              </div>
            );
          })}

        {hashtags && hashtags.length > 0 && (
          <div className={classes.element}>
            <div className={classes.h3}>hashtags</div>
            <div className={cn(classes.content, classes.hashtag)}>
              {hashtags.map((tag: string, index: number) => (
                <div key={user + String(index)}>{`#${tag}`}&nbsp;</div>
              ))}
            </div>
          </div>
        )}
        {urls && urls.length > 0 && (
          <div className={classes.element}>
            <div className={classes.h3}>url</div>
            <div className={cn(classes.content, classes.urls)}>
              {urls.map((url: string, index: number) => (
                <div key={url + String(index)}>{`${url}`}&nbsp;</div>
              ))}
            </div>
          </div>
        )}
        {symbols && symbols.length > 0 && (
          <div className={classes.element}>
            <div className={classes.h3}>symbols</div>
            <div className={cn(classes.content, classes.symbols)}>
              {symbols.map((symbol: string, index: number) => (
                <div key={symbol + String(index)}>{`${symbol}`}&nbsp;</div>
              ))}
            </div>
          </div>
        )}
        {user_mentions && user_mentions.length > 0 && (
          <div className={classes.element}>
            <div className={classes.h3}>user_mentions</div>
            <div className={cn(classes.content, classes.userMentions)}>
              {user_mentions.map((user: string, index: number) => (
                <div key={user + String(index)}>{`@${user}`}&nbsp;</div>
              ))}
            </div>
          </div>
        )}
        {mediaElements &&
          mediaElements.map((el, index) => {
            if (el.type === 'video') {
              return (
                <div className={classes.element} key={el.cid + index}>
                  <div className={classes.h3}>video</div>
                  <div className={cn(classes.content, classes.symbols)}>
                    <div className={classes.src}>
                      <a href={el.src} target='_blank' rel='noreferrer'>
                        sourse
                      </a>
                    </div>
                    <div className={classes.image}>
                      <video controls>
                        <source src={el.imageUrl} type='video/mp4' />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              );
            }
            if (el.type === 'photo') {
              return (
                <div className={classes.element} key={el.cid + index}>
                  <div className={classes.h3}>image</div>
                  <div className={cn(classes.content, classes.media)}>
                    <div className={classes.src}>
                      <a href={el.src} target='_blank' rel='noreferrer'>
                        sourse
                      </a>
                    </div>
                    <div className={classes.image}>
                      <img src={el.imageUrl} alt='media el' />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className={classes.element} key={el.cid + index}>
                <div className={classes.h3}>Unknown element</div>
                <div className={cn(classes.content)}>{el.src}</div>
              </div>
            );
          })}
        {!!card && (
          <div className={classes.element}>
            <div className={classes.h3}>Card</div>
            <div className={cn(classes.content, classes.card)}>
              {card.player_image_original && (
                <div className={classes.thumb}>
                  <img src={card.player_image_original} alt='card thumb'></img>
                </div>
              )}
              {card.thumbnail_image_original && (
                <div className={classes.thumb}>
                  <img src={card.thumbnail_image_original} alt='card thumb'></img>
                </div>
              )}
              {card.card_url && (
                <div>
                  <a href={card.card_url}>{card.card_url}</a>
                </div>
              )}
              {card.domain && <div>{card.domain}</div>}
              {card.title && <div>{card.title}</div>}
              {card.vanity_url && <div>{card.vanity_url}</div>}
              {card.description && <div>{card.description}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

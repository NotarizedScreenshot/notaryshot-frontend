import cn from 'classnames';
import { ITweetDetailsPreviewProps } from './TweetDetailsPreviewProps';
import classes from './TweetDetailsPreview.module.scss';
import { Fragment } from 'react';
import { number } from 'yup';
import { ITweetBody, ITweetUser, ITweetDetails } from 'types';
import { isTweetBodyElementEmpty } from 'utils';

const renderBodyElements = (key: keyof ITweetBody, body: ITweetBody) => {
  const bodyCardKeys = body.card ? (Object.keys(body.card) as [keyof typeof body.card]) : [];
  return (
    <div className={classes.dataSubBlock} key={key + String(number)}>
      <div className={classes.header}>{key}</div>
      <div className={classes.value}>
        {key === 'media' &&
          (!isTweetBodyElementEmpty(key, body) ? (
            body[key]?.map((mediaEl, index: number) => {
              return (
                <Fragment key={mediaEl.src + String(index)}>
                  {mediaEl.type === 'photo' && (
                    <>
                      <div className={classes.link}>{mediaEl.src}</div>
                      <div className={classes.image}>
                        <img src={mediaEl.src} alt={key} />
                      </div>
                    </>
                  )}
                  {mediaEl.type === 'video' && (
                    <>
                      <div className={classes.link}>{mediaEl.src}</div>
                      <div className={classes.image}>
                        <img src={mediaEl.thumb} alt={key} />
                        <video controls>
                          <source src={mediaEl.src} type='video/mp4' />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </>
                  )}
                </Fragment>
              );
            })
          ) : (
            <div className={classes.unavailable}>unavailable</div>
          ))}
        {key === 'full_text' &&
          (!isTweetBodyElementEmpty(key, body) ? (
            <div className={classes.value}>{body[key]}</div>
          ) : (
            <div className={classes.unavailable}>unavailable</div>
          ))}
        {key === 'urls' &&
          (!isTweetBodyElementEmpty(key, body) ? (
            body[key]?.map((data: string, index: number) => {
              return (
                <div className={classes.link} key={data + String(index)}>
                  <a href={data}>{data}</a>
                </div>
              );
            })
          ) : (
            <div className={classes.unavailable}>unavailable</div>
          ))}
        {(key === 'user_mentions' || key === 'hashtags' || key === 'symbols') &&
          (!isTweetBodyElementEmpty(key, body) ? (
            body[key]?.map((data: string, index: number) => {
              return (
                <div className={classes.link} key={data + String(index)}>
                  {data}
                </div>
              );
            })
          ) : (
            <div className={classes.unavailable}>unavailable</div>
          ))}
        {key === 'card' &&
          (!!body[key] ? (
            bodyCardKeys.map((bodyCardKey, index) => {
              return (
                <div className={classes.dataSubBlock} key={bodyCardKey + String(index)}>
                  <div className={classes.header}>{bodyCardKey}</div>
                  {key.includes('image') ? (
                    body.card && (
                      <div className={classes.value}>
                        <div className={classes.link}>{!!body.card && body.card[bodyCardKey]}</div>
                        <div className={classes.image}>
                          <img src={body.card[bodyCardKey]} alt={bodyCardKey} />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className={classes.value}>{!!body.card && body.card[bodyCardKey]}</div>
                  )}
                </div>
              );
            })
          ) : (
            <div className={classes.unavailable}>unavailable</div>
          ))}
      </div>
    </div>
  );
};

export const TweetDetailsPreview: React.FC<ITweetDetailsPreviewProps> = ({ tweetData }) => {
  const { details, user, body } = tweetData;
  const detailsKeys = !!details ? (Object.keys(details) as [keyof ITweetDetails]) : null;
  const userKeys = !!user ? (Object.keys(user) as [keyof ITweetUser]) : null;
  const bodyKeys = !!body ? (Object.keys(body) as [keyof ITweetBody]) : null;

  return (
    <div className={classes.container}>
      <div className={classes.dataBlock}>
        <div className={classes.header}>Tweet stat details</div>
        {/* {!!detailsKeys && <div className={classes.hash}>hashSum: 0x{tweetDataHash}</div>} */}
        {!!detailsKeys ? (
          detailsKeys.map((key, index) => (
            <div className={classes.dataSubBlock} key={key + String(index)}>
              <div className={classes.header}>{key}</div>
              <div className={classes.value}>{details[key]}</div>
            </div>
          ))
        ) : (
          <div>Can not get tweet stats details</div>
        )}
      </div>
      <div className={classes.dataBlock}>
        <div className={classes.header}>Tweet user info</div>
        {!!userKeys ? (
          userKeys.map((key, index) => (
            <div className={classes.dataSubBlock} key={key + String(index)}>
              <div className={classes.header}>{key}</div>
              {key.includes('image') ? (
                <div className={classes.value}>
                  <div className={classes.link}>{user[key]}</div>
                  <div className={cn(classes.image, classes.userpic)}>
                    <img src={user[key]} alt={key} />
                  </div>
                </div>
              ) : (
                <div className={classes.value}>{user[key]}</div>
              )}
            </div>
          ))
        ) : (
          <div>Can not get user information</div>
        )}
      </div>
      <div className={classes.dataBlock}>
        <div className={classes.header}>Tweet body details</div>
        {!!bodyKeys ? (
          bodyKeys.map((key) => {
            return renderBodyElements(key, body);
          })
        ) : (
          <div>Can not get body details</div>
        )}
      </div>
    </div>
  );
};

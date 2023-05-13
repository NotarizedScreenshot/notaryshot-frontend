import enchex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import { ITweetBody, ITweetData, ITweetDetails, ITweetResults, ITweetUser } from 'types';

export const convertImageSize = (
  srcWidth: number,
  srcHeight: number,
  canvasWidth: number,
  canvasHeight: number,
): {
  height: number;
  width: number;
} => {
  const srcRatio = srcWidth / srcHeight;
  if ((srcRatio < 1 || canvasWidth >= canvasHeight) && canvasHeight * srcRatio < canvasWidth) {
    return { height: canvasHeight, width: canvasHeight * srcRatio };
  }
  return { height: canvasWidth / srcRatio, width: canvasWidth };
};

export const getOffset = (
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number,
  offsetXRatio: number = 0,
  offsetYRatio: number = 0,
): { x: number; y: number } => {
  if (imageWidth > canvasWidth || imageHeight > canvasHeight) throw new Error('image bigger that canvas');

  if ((imageWidth === canvasWidth && offsetXRatio !== 0) || (imageHeight === canvasHeight && offsetYRatio !== 0))
    throw new Error('cannot offset if equal sizes');

  if (Math.abs(offsetXRatio) > 1 || Math.abs(offsetYRatio) > 1) throw new Error('offsetRaion more than 1');

  const xDiff = canvasWidth - imageWidth;
  const yDiff = canvasHeight - imageHeight;

  return { x: (xDiff / 2) * (1 + offsetXRatio), y: (yDiff / 2) * (1 + offsetYRatio) };
};

export const getStampedImagePreviewDataUrl = (
  backgroundImage: HTMLImageElement,
  watermarkImgae: HTMLImageElement,
  metadata: string[] = [],
  canvasWidth: number = 500,
  metadataOptions: {
    stringMaxWidth: number;
    leftPadding: number;
    lineHeight: number;
    font: string;
    color: string;
  } = {
    stringMaxWidth: 400,
    leftPadding: 10,
    lineHeight: 5,
    font: '5px monospace',
    color: 'red',
  },
): string => {
  const canvas = document.createElement('canvas');

  const imgWidth = backgroundImage.width;
  const imgHeight = backgroundImage.height;
  const imgRatio = imgWidth / imgHeight;

  const stampWidth = watermarkImgae.width;
  const stampHeight = watermarkImgae.height;

  const canvasHeight = canvasWidth / imgRatio;

  canvas.setAttribute('width', String(canvasWidth));
  canvas.setAttribute('height', String(canvasHeight));

  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

  const stampFitCanvasSizes = convertImageSize(stampWidth, stampHeight, canvasWidth, canvasHeight);

  const offset = getOffset(canvasWidth, canvasHeight, stampFitCanvasSizes.width, stampFitCanvasSizes.height);
  ctx.drawImage(watermarkImgae, offset.x, offset.y, stampFitCanvasSizes.width, stampFitCanvasSizes.height);

  const { font, color, leftPadding, lineHeight, stringMaxWidth } = metadataOptions;

  ctx.font = font;
  ctx.fillStyle = color;

  metadata.forEach((string, index) => {
    const stringWidth = ctx.measureText(string).width;
    if (stringWidth > stringMaxWidth) {
      const maxLength = Math.floor(stringMaxWidth / (stringWidth / string.length));
      ctx.fillText(string.substring(0, maxLength), leftPadding, lineHeight * index);
      return;
    }
    ctx.fillText(string, leftPadding, lineHeight * index);
  });

  return canvas.toDataURL();
};

export const validateBigInt = (data: string): Promise<boolean> =>
  new Promise((resovle, reject) => {
    if (data.length === 0) reject(new Error('should not be empty'));
    if (!/^\d+$/.test(data)) reject(new Error('should contain only digits'));
    if (BigInt(data) > BigInt(2 ** 64 - 1)) reject(new Error('should be a valid 64-bit UInt'));
    resovle(true);
  });

export const isValidBigInt = (data: string) => {
  if (data.length === 0) return false;
  if (!/^\d+$/.test(data)) return false;
  if (BigInt(data) > BigInt(2 ** 64 - 1)) return false;
  return true;
};

export const isTweetBodyElementEmpty = (key: keyof ITweetBody, body: ITweetBody): boolean =>
  key === 'card' ? false : !body[key] || body[key]!.length === 0;


  export const getTweetResultsFromTweetRawData = (tweetRawDataString: string, tweetId: string) => {
    try {
      const tweetRawDataParsed = JSON.parse(tweetRawDataString);
    const tweetResponseInstructions = tweetRawDataParsed.data['threaded_conversation_with_injections_v2'].instructions;

    const tweetTimeLineEntries = tweetResponseInstructions.find((el: any) => el.type === 'TimelineAddEntries').entries;

    const itemContents = tweetTimeLineEntries.reduce((acc: any, val: any) => {
      return val.entryId === `tweet-${tweetId}` ? val : acc;
    }, null).content.itemContent;

    return itemContents.tweet_results.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const createTweetData = (tweetResults: ITweetResults): ITweetData => {
  const { legacy, views, core, card } = tweetResults;
  const {
    full_text,
    created_at,
    favorite_count,
    quote_count,
    retweet_count,
    entities,
    extended_entities,
    bookmark_count,
  } = legacy;

  const { user_mentions, urls, hashtags, symbols } = entities as {
    user_mentions: any[];
    urls: any[];
    hashtags: any[];
    symbols: any[];
  };

  const media = extended_entities?.media ?? [];

  const { profile_image_url_https, name, screen_name } = core.user_results.result.legacy;

  const user: ITweetUser = {
    profile_image_url_https,
    name,
    screen_name,
  };

  const views_count = views.count;
  const details: ITweetDetails = {
    created_at,
    favorite_count,
    quote_count,
    retweet_count,
    views_count,
    bookmark_count,
  };

  const props = [
    'vanity_url',
    'card_url',
    'title',
    'description',
    'domain',
    'thumbnail_image_original',
    'player_image_original',
  ];

  const cardData: ITweetBody['card'] = !card
    ? null
    : card?.legacy.binding_values.reduce((acc: any, val: any) => {
        if (props.includes(val.key)) {
          if (val.value.type === 'STRING') {
            acc[val.key] = val.value.string_value;
          }

          if (val.value.type === 'IMAGE') {
            acc[val.key] = val.value.image_value.url;
          }
        }
        return acc;
      }, {});

  const tweetUrls: ITweetBody['urls'] =
    !urls || urls.length === 0 ? null : urls?.map((url: { expanded_url: string }) => url.expanded_url);

  const tweetHashTags: ITweetBody['hashtags'] =
    !hashtags || hashtags.length === 0 ? null : hashtags?.map((hashtag: { text: string }) => hashtag.text);

  const tweetSymbols: ITweetBody['symbols'] =
    !symbols || symbols.length === 0 ? null : symbols?.map((symbol: { text: string }) => symbol.text);

  const tweetMedia: ITweetBody['media'] = !media
    ? null
    : media.map(
        ({
          type,
          media_url_https,
          video_info,
        }: {
          media_url_https: string;
          type: 'photo' | 'video';
          video_info: { variants: any[] };
        }) => {
          if (type === 'video') {
            const minBitrateVariant = video_info.variants.reduce((acc, val) => {
              if ((!!acc.bitrate && val.bitrate < acc.bitrate) || (!acc.bitrate && val.bitrate)) return val;
              return acc;
            }, {});

            return { type, src: minBitrateVariant.url, thumb: media_url_https };
          }
          return { type, src: media_url_https };
        },
      );

  const tweetMentions: ITweetBody['user_mentions'] =
    !user_mentions || user_mentions.length === 0
      ? null
      : user_mentions.map((mention: { screen_name: string }) => mention.screen_name);

  const tweetBookmarksCount: string | null = bookmark_count > 0 ? String(bookmark_count) : null;

  const body: ITweetBody = {
    full_text,
    card: cardData,
    urls: tweetUrls,
    hashtags: tweetHashTags,
    symbols: tweetSymbols,
    media: tweetMedia,
    user_mentions: tweetMentions,
    bookmark_count: tweetBookmarksCount,
  };

  const tweetData = {
    body,
    user,
    details,
  };
  return tweetData;
};

export const processTweetData = (tweetRawData: any, tweetId: string) => {
  const tweetResults = getTweetResultsFromTweetRawData(tweetRawData, tweetId) as ITweetResults;
  return createTweetData(tweetResults);
};

export const getTrustedHashSum = (data: string | Buffer | ArrayBuffer) =>
  enchex.stringify(
    // @ts-ignore
    sha256(CryptoJS.lib.WordArray.create(data)),
  );

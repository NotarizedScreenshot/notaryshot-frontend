import { ITweetData } from 'types';

export const tweetdataStub1: ITweetData = {
  body: {
    full_text: 'tweet text',
    urls: [],
    hashtags: [],
    media: [],
    symbols: [],
    user_mentions: [],
    card: null,
  },
  user: { profile_image_url_https: '', name: '', screen_name: '' },
  details: {
    created_at: '',
    favorite_count: 0,
    views_count: '0',
    quote_count: 0,
    retweet_count: 0,
  },
};

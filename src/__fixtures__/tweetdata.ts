import { ITweetBody, ITweetData } from 'types';

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

export const tweetBodyStubEmpty1: ITweetBody = {
  card: {
    description: '',
    domain: '',
    thumbnail_image_original: '',
    vanity_url: '',
    title: '',
    card_url: '',
  },
  full_text: '',
  urls: null,
  hashtags: null,
  media: [],
  symbols: null,
  user_mentions: null,
};
export const tweetBodyStubFull1: ITweetBody = {
  card: {
    description: '',
    domain: '',
    thumbnail_image_original: '',
    vanity_url: '',
    title: '',
    card_url: '',
  },
  full_text: 'some tests',
  urls: ['url'],
  hashtags: ['#1', '#2'],
  media: [
    { type: 'video', src: 'string', thumb: 'string' },
    { type: 'video', src: 'string1', thumb: 'string1' },
  ],
  symbols: ['symb1', 'symb2'],
  user_mentions: ['ment1', 'ment2'],
};

export interface IMetadata {
  ip: string;
  url: string;
  headers: { [key: string]: any };
  dns: { host: string; data: string[] };
}

export interface ITweetResults {
  legacy: any;
  views: any;
  core: any;
  card: any;
}

export interface ITweetBody {
  full_text: string;
  card: {
    description: string;
    domain: string;
    thumbnail_image_original?: string;
    player_image_original?: string;
    vanity_url: string;
    title: string;
    card_url: string;
  } | null;
  urls: string[] | null;
  hashtags: string[] | null;
  symbols: string[] | null;
  media: { type: 'photo' | 'video'; src: string; thumb?: string }[] | null;
  user_mentions: string[] | null;
  bookmark_count: string | null;
}

export interface ITweetUser {
  profile_image_url_https: string;
  name: string;
  screen_name: string;
}

export interface ITweetDetails {
  created_at: string;
  favorite_count: number;
  quote_count: number;
  retweet_count: number;
  views_count: string;
  bookmark_count: string;
}
export interface ITweetData {
  body: ITweetBody;
  user: ITweetUser;
  details: ITweetDetails;
}

export interface IFetchedData {
  imageUrl: string | null;
  tweetdata: string | null;
  metadata: string | null;
}

export interface ITweetAttributes {
  hashtags: ITweetBody['hashtags'];
  user_mentions: ITweetBody['user_mentions'];
  urls: ITweetBody['urls'];
}

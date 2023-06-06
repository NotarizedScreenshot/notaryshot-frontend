import { ITweetData } from 'types';

export interface ITweetResultsProps {
  children?: React.ReactNode;
  imageUrl: string | null;
  tweetdata: ITweetData | null;
  tweetId: string | null;
  nftId?: string;
}

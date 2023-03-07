import { ITweetData } from 'types';

export interface ITweetDetailsPreviewProps {
  children?: React.ReactNode;
  tweetData: ITweetData;
  tweetStatsHash: string;
  tweetUserInfoHash: string;
  tweetBodyDetailsHash: string;
}

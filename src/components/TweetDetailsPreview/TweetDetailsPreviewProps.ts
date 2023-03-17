import { ITweetData } from 'types';

export interface ITweetDetailsPreviewProps {
  children?: React.ReactNode;
  tweetData: ITweetData;
  tweetDataHash: string | null;
}

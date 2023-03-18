export interface ITweetInfoProps {
  children?: React.ReactNode;
  data: any;
  media: { src: string; cid: string }[];
  tweetId: string;
}

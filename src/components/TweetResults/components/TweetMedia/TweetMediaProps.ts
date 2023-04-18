export interface ITweetMediaProps {
  children?: React.ReactNode;
  media: { type: 'photo' | 'video'; src: string; thumb?: string }[];
}

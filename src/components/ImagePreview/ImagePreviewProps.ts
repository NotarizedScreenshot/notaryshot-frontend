export interface IImagePreviewProps {
  children?: React.ReactNode;
  image: string | null;
  qrData: {
    trustedHashSum: string;
    tweetId: string;
    metadataHash: string;
    previewImageHash: string;
    tweetDataHash: string;
  } | null;
}

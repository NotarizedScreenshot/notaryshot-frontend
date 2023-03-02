export interface IMetadataPreviewProps {
  children?: React.ReactNode;
  data: {
    ip: string;
    url: string;
    headers: { [key: string]: any };
    dns: { host: string; data: string[] };
  };
}

export interface IMetadata {
  ip: string;
  url: string;
  headers: { [key: string]: any };
  dns: { host: string; data: string[] };
}

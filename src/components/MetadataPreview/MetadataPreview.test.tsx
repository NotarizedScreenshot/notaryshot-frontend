import { render, screen } from '@testing-library/react';

import { MetadataPreview } from './MetadataPreview';

const metadata: {
  ip: string;
  url: string;
  headers: { [key: string]: any };
  dns: { host: string; data: string[] };
} = {
  ip: '127.127.127.127',
  url: 'https://twitter.com',
  dns: {
    host: 'twitter.com',
    data: [
      'twitter.com.\t\t293\tIN\tTXT\t"bj6sbt5xqs9hw9jrfvz7hplrg0l680sb"',
      '; <<>> DiG 9.10.6 <<>> twitter.com +trace any',
    ],
  },
  headers: {
    'cache-control': 'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
    'content-encoding': 'gzip',
  },
};

describe('metadata prview component', () => {
  test('if metadata preview rendered', async () => {
    render(<MetadataPreview data={metadata} />);

    expect(screen.getByText('url')).toBeInTheDocument();
    expect(screen.getByText(metadata.url)).toBeInTheDocument();
    expect(screen.getByText('ip')).toBeInTheDocument();
    expect(screen.getByText(metadata.ip)).toBeInTheDocument();
    expect(screen.getByText('dns')).toBeInTheDocument();
    expect(screen.getByText(metadata.dns.data[0].split('\t')[0])).toBeInTheDocument();
    expect(
      screen.getByText(metadata.dns.data[0].split('\t').slice(1).join(' ').trim()),
    ).toBeInTheDocument();
    expect(screen.getByText('headers')).toBeInTheDocument();
    const headersKeys = Object.keys(metadata.headers);
    headersKeys.forEach((key: string) => {
      expect(screen.getByText(metadata.headers[key])).toBeInTheDocument();
    });
  });
});

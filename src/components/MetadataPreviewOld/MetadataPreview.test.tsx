import { render, screen } from '@testing-library/react';
import { metadataStub2 } from '__fixtures__/metadata';
import { MetadataPreviewOld } from './MetadataPreview';

describe('metadata prview component', () => {
  test('if metadata preview rendered', async () => {
    render(<MetadataPreviewOld data={metadataStub2} />);

    expect(screen.getByText('HTTP Request data')).toBeInTheDocument();

    const ipBlockElement = screen.getByTestId('ip-block');
    expect(ipBlockElement).toBeInTheDocument();
    expect(screen.getByText(metadataStub2.ip)).toBeInTheDocument();

    const urlBlockElement = screen.getByTestId('url-block');
    expect(urlBlockElement).toBeInTheDocument();
    expect(screen.getByText(metadataStub2.url)).toBeInTheDocument();

    const headersBlockElement = screen.getByTestId('headers-block');
    expect(headersBlockElement).toBeInTheDocument();
    const headersKeys = Object.keys(metadataStub2.headers);
    headersKeys.forEach((key: string) => {
      expect(screen.getByText(metadataStub2.headers[key])).toBeInTheDocument();
    });

    const dnsBlockElement = screen.getByTestId('dns-block');
    expect(dnsBlockElement).toBeInTheDocument();

    expect(screen.getByText(metadataStub2.dns.data[0].split('\t')[0])).toBeInTheDocument();
    expect(
      screen.getByText(metadataStub2.dns.data[0].split('\t').slice(1).join(' ').trim()),
    ).toBeInTheDocument();
    
  });
});

import { render, screen } from '@testing-library/react';
import { metadataStub2 } from '__fixtures__/metadata';
import { MetadataPreview } from './MetadataPreview';

describe('metadata prview component', () => {
  test('if metadata preview rendered', async () => {
    render(<MetadataPreview data={metadataStub2} />);

    expect(screen.getByText('url')).toBeInTheDocument();
    expect(screen.getByText(metadataStub2.url)).toBeInTheDocument();
    expect(screen.getByText('ip')).toBeInTheDocument();
    expect(screen.getByText(metadataStub2.ip)).toBeInTheDocument();
    expect(screen.getByText('dns')).toBeInTheDocument();
    expect(screen.getByText(metadataStub2.dns.data[0].split('\t')[0])).toBeInTheDocument();
    expect(
      screen.getByText(metadataStub2.dns.data[0].split('\t').slice(1).join(' ').trim()),
    ).toBeInTheDocument();
    expect(screen.getByText('headers')).toBeInTheDocument();
    const headersKeys = Object.keys(metadataStub2.headers);
    headersKeys.forEach((key: string) => {
      expect(screen.getByText(metadataStub2.headers[key])).toBeInTheDocument();
    });
  });
});

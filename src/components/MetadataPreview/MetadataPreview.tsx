import { memo } from 'react';
import cn from 'classnames';
import { IMetadataPreviewProps } from './MetadataPreviewProps';
import classes from './MetadataPreview.module.scss';

export const MetadataPreview: React.FC<IMetadataPreviewProps> = memo(
  ({ data, preview, dnsHash, headersHash }) => {
    const { ip, url, headers, dns } = data;
    const headersKeys = Object.keys(headers);
    const dnsData = dns.data
      .filter((el: string) => el.length > 0 && !el.includes(';'))
      .map((el: string) => {
        return el
          .split('\t')
          .filter((el) => el.length > 0)
          .flatMap((el, _, array) => (array.length === 1 ? el.split(' ') : el));
      })
      .reduce((acc: { [id: string]: any }, value: string[]) => {
        if (acc.hasOwnProperty(value[0])) {
          acc[value[0]].push(value.slice(1));
          return acc;
        }
        acc[value[0]] = [value.slice(1)];
        return acc;
      }, {});

    return (
      <div className={cn(classes.container, preview ? classes.preview : null)}>
        <div className={classes.header}>HTTP Request data</div>
        <div className={classes.hash}>hashSum: {headersHash}</div>

        <div className={classes.dataBlock} data-testid='ip-block'>
          <div className={classes.header}>ip</div>
          <div className={classes.value}>{ip}</div>
        </div>
        <div className={classes.dataBlock} data-testid='url-block'>
          <div className={classes.header}>url</div>
          <div className={classes.value}>{url}</div>
        </div>
        <div className={classes.dataBlock} data-testid='headers-block'>
          <div className={classes.header}>headers</div>
          {headersKeys.map((key) => (
            <div key={key} className={cn(classes.dataSubBlock, classes.headers)}>
              <div className={classes.header}>{key}</div>
              <div className={classes.value}>{headers[key]}</div>
            </div>
          ))}
        </div>
        <div className={classes.dataBlock} data-testid='dns-block'>
          <div className={classes.header}>Request dns data</div>
          <div className={classes.hash}>hashSum: {dnsHash}</div>
          {Object.keys(dnsData).map((dnsDataKey: string, index: number) => {
            return (
              <div key={dnsDataKey + String(index)} className={classes.dataSubBlock}>
                <div className={classes.header}>{dnsDataKey}</div>
                {dnsData[dnsDataKey].map((dnsDataEl: string[], index: number) => (
                  <div key={dnsDataEl + String(index)} className={classes.value}>
                    {dnsDataEl.join(' ')}
                  </div>
                ))}
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

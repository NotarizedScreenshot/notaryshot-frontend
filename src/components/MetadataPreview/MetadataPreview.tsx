import { memo } from 'react';
import cn from 'classnames';
import { IMetadataPreviewProps } from './MetadataPreviewProps';
import classes from './MetadataPreview.module.scss';

export const MetadataPreview: React.FC<IMetadataPreviewProps> = memo(({ data, preview }) => {
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
      <div className={classes.dataBlock}>
        <span className={classes.header}>ip</span>
        <span className={classes.value}>{ip}</span>
      </div>
      <div className={classes.dataBlock}>
        <span className={classes.header}>url</span>
        <span className={classes.value}>{url}</span>
      </div>
      <div className={classes.dataBlock}>
        <div className={classes.header}>headers</div>
        {headersKeys.map((key) => (
          <div key={key} className={cn(classes.dataSubBlock, classes.headers)}>
            <div className={classes.header}>{key}</div>
            <div className={classes.value}>{headers[key]}</div>
          </div>
        ))}
      </div>
      <div className={classes.dataBlock}>
        <span className={classes.header}>dns</span>
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
});

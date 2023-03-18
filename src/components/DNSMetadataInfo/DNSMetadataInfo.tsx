import cn from 'classnames';
import { IDNSMetadataInfoProps } from './DNSMetadataInfoProps';
import classes from './DNSMetadataInfo.module.scss';
export const DNSMetadataInfo: React.FC<IDNSMetadataInfoProps> = ({ data }) => {
  const { dns } = data;  
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
    <div className={cn(classes.container)}>
      <div className={classes.dataBlock} data-testid='dns-block'>
        <div className={classes.header}>Request dns data</div>
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
};

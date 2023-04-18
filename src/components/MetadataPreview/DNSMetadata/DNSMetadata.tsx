import { IDNSMetadataProps } from './DNSMetadataProps';
import styles from './DNSMetadata.module.scss';
import { IMetadata } from 'types';
export const DNSMetadata: React.FC<IDNSMetadataProps> = ({ metadata }) => {
  const data = JSON.parse(metadata) as IMetadata;
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
    <div className={styles.container}>
      <div className={styles.dataBlock} data-testid='dns-block'>
        <div className={styles.heading}>Request dns data</div>
        {Object.keys(dnsData).map((dnsDataKey: string, index: number) => {
          return (
            <div key={dnsDataKey + String(index)} className={styles.dataSubBlock}>
              <div className={styles.heading}>{dnsDataKey}</div>
              {dnsData[dnsDataKey].map((dnsDataEl: string[], index: number) => (
                <div key={dnsDataEl + String(index)} className={styles.value}>
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

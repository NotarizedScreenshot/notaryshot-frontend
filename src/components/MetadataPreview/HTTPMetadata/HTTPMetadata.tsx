import cn from 'classnames';
import { IHTTPMetadataProps } from './HTTPMetadataProps';
import styles from './HTTPMetadata.module.scss';
import { IMetadata } from 'types';
export const HTTPMetadata: React.FC<IHTTPMetadataProps> = ({ metadata }) => {
  const data = JSON.parse(metadata) as IMetadata;
  const { ip, url, headers } = data;
  const headersKeys = Object.keys(headers);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>HTTP Request data</div>
      <div className={styles.dataBlock} data-testid='ip-block'>
        <div className={styles.heading}>ip</div>
        <div className={styles.value}>{ip}</div>
      </div>
      <div className={styles.dataBlock} data-testid='url-block'>
        <div className={styles.heading}>url</div>
        <div className={styles.value}>{url}</div>
      </div>
      <div className={styles.dataBlock} data-testid='headers-block'>
        <div className={styles.heading}>headers</div>
        {headersKeys.map((key) => (
          <div key={key} className={cn(styles.dataSubBlock, styles.headers)}>
            <div className={styles.heading}>{key}</div>
            <div className={styles.value}>{headers[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

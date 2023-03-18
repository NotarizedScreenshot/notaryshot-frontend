import cn from 'classnames';
import { IMetadataInfoProps } from './MetadataInfoProps';
import classes from './MetadataInfo.module.scss';
export const MetadataInfo: React.FC<IMetadataInfoProps> = ({ data }) => {
  const { ip, url, headers } = data;
  const headersKeys = Object.keys(headers);
  return (
    <div className={cn(classes.container)}>
      <div className={classes.header}>HTTP Request data</div>
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
    </div>
  );
};

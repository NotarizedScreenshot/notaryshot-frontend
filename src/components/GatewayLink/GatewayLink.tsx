import { IGatewayLinkProps } from './GatewayLinkProps';
import cn from 'classnames';
import styles from './GatewayLink.module.scss';
import { getGatewayLink } from 'utils';

export const GatewayLink: React.FC<IGatewayLinkProps> = ({ cid, title = 'Gateway link', size = 'regular' }) => {
  return (
    <div className={cn(styles.container, styles[size])} onClick={(event) => event.stopPropagation()}>
      {cid ? (
        <a className={styles.link} href={getGatewayLink(cid)} target='_blank' rel='noreferrer'>
          <img className={styles.icon} src='images/Icon-ipfs.png' alt='ipfs logo' />
          {title}
        </a>
      ) : (
        'cid link unavailable'
      )}
    </div>
  );
};

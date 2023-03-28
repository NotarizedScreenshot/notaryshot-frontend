import { INFTInfoProps } from './NFTInfoProps';
import classes from './NFTInfo.module.scss';
export const NFTInfo: React.FC<INFTInfoProps> = ({ id }) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.h3}>NFTInfo</h3>
      <div className={classes.content}>
        {id ? (
          <>
            <div className={classes.logo}>
              <div className={classes.header}>OpenSea</div>
              <div className={classes.image}>
                <img src='/images/opensea.png' alt='opensea logo' />
              </div>
            </div>
            <div className={classes.link}>
              <a
                target='_blank'
                rel='noreferrer'
                href={`https://opensea.io/assets/matic/0xa567349bdd3d4f2c3e25f65745a020162c202ef2/${id}`}
              >{`https://opensea.io/assets/matic/0xa567349bdd3d4f2c3e25f65745a020162c202ef2/${id}`}</a>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

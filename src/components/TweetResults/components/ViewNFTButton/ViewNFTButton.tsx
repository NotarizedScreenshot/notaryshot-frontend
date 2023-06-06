import { IViewNFTButtonProps } from './ViewNFTButtonProps';
import styles from './ViewNFTButton.module.scss';
export const ViewNFTButton: React.FC<IViewNFTButtonProps> = ({ nftId }) => {
  const clickHandler = () => {
    console.log('should navigate to nft collection');
  };
  return (
    <div className={styles.container}>
      {nftId ? (
        <a href={nftId ? `${process.env.REACT_APP_NFT_GATEWAY}${nftId}` : '#'} target='_blank' rel='noreferrer'>
          <button className={styles.button} onClick={clickHandler}>
            <div className={styles.image}>
              <img src='images/Icon-opensea.png' alt='open-sea' />
            </div>
            View My NFT
          </button>
        </a>
      ) : (
        <button className={styles.button} onClick={clickHandler} disabled>
          Fetching NFT link...
        </button>
      )}
    </div>
  );
};

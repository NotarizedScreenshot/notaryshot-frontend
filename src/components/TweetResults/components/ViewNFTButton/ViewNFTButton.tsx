import { IViewNFTButtonProps } from './ViewNFTButtonProps';
import styles from './ViewNFTButton.module.scss';
export const ViewNFTButton: React.FC<IViewNFTButtonProps> = () => {
  const clickHandler = () => {
    console.log('should navigate to nft collection');
  };
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={clickHandler}>
        <div className={styles.image}>
          <img src='images/Icon-opensea.png' alt='open-sea' />
        </div>
        View My NFT
      </button>
    </div>
  );
};

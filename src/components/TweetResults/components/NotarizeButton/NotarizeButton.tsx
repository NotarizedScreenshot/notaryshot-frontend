import { INotarizeButtonProps } from './NotarizeButtonProps';
import styles from './NotarizeButton.module.scss';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { submitNotarization } from 'lib/apiClient';
import {
  useFetchingContext,
  useModalDispatchContext,
  showModal,
  hideModal,
  EModalDialogTypes,
  useTransactionContext,
  useProgressingContext,
} from 'contexts';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotarizeButton: React.FC<INotarizeButtonProps> = () => {
  const { tweetId } = useFetchingContext();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const dispatch = useModalDispatchContext();
  const navigate = useNavigate();
  const { setTransactionId, setTransactionStatus } = useTransactionContext();
  const { contentId } = useProgressingContext();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();

  console.log('Notarize button on render, acceptable chains:', chains);
  console.log('Notatize button on render, current chains: ', chain);

  const updateStateOnTransaction = useCallback(
    (transactionStatus: string) => showModal(dispatch, EModalDialogTypes.transaction, { transactionStatus }),
    [dispatch],
  );
  const clickHandler = async () => {
    const isCurrentChainWrong = !chains.find(({ id }) => chain?.id === id);
    console.log('Notarize button on click, acceptable chains:', chains);
    console.log('Notatize button on click, current chains: ', chain);
    console.log('Notatize button on click, is current chain correct: ', !isCurrentChainWrong);

    if (isCurrentChainWrong && !!openChainModal) {
      console.log('Notatize button click, incorrect current chain');
      openChainModal();
      return;
    }

    if (!isConnected && !!openConnectModal) {
      openConnectModal();
      return;
    }

    //TODO: #133 remove hardcode chain id check once wrong chaing bug surely fixed
    //https://github.com/orgs/NotarizedScreenshot/projects/1/views/1?pane=issue&itemId=31996862
    if (chain?.id !== 137) {
      console.error('Not the polygon chain! Current chain: ', chain);
      return;
    }
    if (tweetId && contentId?.nftMetadataCid && chain?.id === 137) {
      updateStateOnTransaction('Waiting for transaction...');
      const result = await submitNotarization(tweetId, contentId?.nftMetadataCid, updateStateOnTransaction);
      if (result.status === 'failed') {
        updateStateOnTransaction(result.error ? result.error : 'Transaction declined');

        setTimeout(() => dispatch(hideModal), 3000);
        return;
      }
      updateStateOnTransaction('Transaction succeed');
      setTimeout(() => {
        navigate(`/results`);
        dispatch(hideModal);
        setTransactionId(result.transactionHash!);
        setTransactionStatus('success');
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={clickHandler}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.2732 0.0468744C9.31853 0.356249 7.73884 1.78125 7.23259 3.69844C7.07322 4.29375 7.04978 5.39062 7.1904 5.97187C7.40134 6.87187 7.76697 7.57031 8.42322 8.30625C8.90603 8.85469 9.22947 9.4875 9.43103 10.2984C9.58103 10.8891 9.58103 12.0844 9.43103 12.6281C9.32322 13.0078 8.98572 13.7719 8.81228 14.0156L8.71384 14.1562H11.9998H15.2857L15.192 14.0203C15.0138 13.7719 14.6717 13.0125 14.5685 12.6328C14.4185 12.0797 14.4185 10.8844 14.5685 10.2984C14.7748 9.46875 15.0888 8.86406 15.6045 8.27344C16.1857 7.61719 16.5701 6.89531 16.7857 6.07031C16.8795 5.70937 16.8935 5.54062 16.8935 4.89844C16.8888 4.24687 16.8748 4.0875 16.767 3.69844C16.2888 1.89844 14.8826 0.539062 13.0685 0.117187C12.6654 0.0234369 11.6763 -0.0140631 11.2732 0.0468744Z'
            fill='#112631'
          />
          <path
            d='M4.24219 15.6422C3.58594 15.7828 3.01875 16.0922 2.5125 16.5844C1.76719 17.3109 1.45312 18.1312 1.45312 19.3359C1.45312 20.0391 1.52344 20.2359 1.82813 20.3906C2.01094 20.4844 2.08125 20.4844 12 20.4844C21.9188 20.4844 21.9891 20.4844 22.1719 20.3906C22.4766 20.2359 22.5469 20.0391 22.5469 19.3359C22.5469 18.4031 22.3875 17.8031 21.9609 17.1562C21.45 16.3734 20.6438 15.825 19.725 15.6375C19.4016 15.5719 18.5578 15.5625 11.9672 15.5672C5.58281 15.5719 4.52344 15.5812 4.24219 15.6422Z'
            fill='#112631'
          />
          <path
            d='M2.85938 22.6641C2.85938 23.5641 2.90625 23.7141 3.225 23.8969L3.4125 24H11.9953C20.5078 24 20.5828 24 20.7656 23.9062C21.0891 23.7422 21.1406 23.5734 21.1406 22.6641V21.8906H12H2.85938V22.6641Z'
            fill='#112631'
          />
        </svg>
        Notarize
      </button>
    </div>
  );
};

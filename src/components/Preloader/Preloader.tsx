import { IPreloaderProps } from './PreloaderProps';
import styles from './Preloader.module.scss';
import { useState } from 'react';
import { useProgressingContext } from 'contexts';
import { Modal } from 'components/Modal';

const getBarMessage = (count: number): string => {
  const messageSet = [
    'Getting the tweet...',
    'Make a screenshot...',
    'Verifying...',
    'Retrieving content id...',
    'Compiling metadata...',
    'Finilazing...',
  ];

  switch (true) {
    case count < 5:
      return messageSet[0];
    case count < 10:
      return messageSet[1];
    case count < 20:
      return messageSet[2];
    case count < 30:
      return messageSet[3];
    case count < 40:
      return messageSet[4];
    default:
      return messageSet[5];
  }
};
export const Preloader: React.FC<IPreloaderProps> = ({ percent = 0 }) => {
  const [count, setCount] = useState(0);

  const { progress } = useProgressingContext();

  const MAX_BAR_ELEMENTS_QUANTITY = 60;
  const MAX_PERCENTS = 100;
  const UPDATE_BAR_TIMEOUT_MS = 800;

  setTimeout(
    () => setCount(Math.floor((MAX_BAR_ELEMENTS_QUANTITY * (progress > percent ? progress : percent)) / MAX_PERCENTS)),
    UPDATE_BAR_TIMEOUT_MS,
  );

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.lens}>
          <img className={styles.image} src='images/lens.png' alt='searching lens' />
        </div>
        <h3 className={styles.h3}>In Progress...</h3>
        <p className={styles.p2}>{getBarMessage(count)}</p>
        <div className={styles.progressBar}>
          {[...Array(count)].map((_, index) => {
            return <div key={index} className={styles.barElement}></div>;
          })}
        </div>
      </div>
    </Modal>
  );
};

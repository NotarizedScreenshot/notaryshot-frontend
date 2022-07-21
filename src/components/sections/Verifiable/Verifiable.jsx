import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Marquee from 'react-fast-marquee';
import styles from './Verifiable.module.scss';

export const Verifiable = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.runningLineContainer}>
        <Marquee gradient={false} direction={'right'}>
          <div className={styles.runningLine}>
            <img src="../../../../public/images/running-line-arrow.png" alt="arrow" />
            <span>{t('runningLine')}</span>
          </div>
          <div className={styles.runningLine}>
            <img src="../../../../public/images/running-line-arrow.png" alt="arrow" />
            <span>{t('runningLine')}</span>
          </div>
          <div className={styles.runningLine}>
            <img src="../../../../public/images/running-line-arrow.png" alt="arrow" />
            <span>{t('runningLine')}</span>
          </div>
        </Marquee>
      </div>

      <h5 className={styles.title}>{t('verifiable.title')}</h5>
      {/* <div>{t('verifiable.description')}</div> */}
      <div className={styles.items}>
        <div className={styles.flexgroup}>
          <div className={styles.item}>
            <img src="../../../../public/images/varifiable/picture.png" alt="pic" />
            <h6>{t('verifiable.items.picture')}</h6>
          </div>
          <div className={styles.item}>
            <img src="../../../../public/images/varifiable/audio.png" alt="pic" />
            <h6>{t('verifiable.items.audio')}</h6>
          </div>
          <div className={styles.item}>
            <img src="../../../../public/images/varifiable/video.png" alt="pic" />
            <h6>{t('verifiable.items.video')}</h6>
          </div>
        </div>

        <div className={cn(styles.item, styles.nft)}>
          <img src="../../../../public/images/varifiable/nft.png" alt="pic" />
          <h6>{t('verifiable.items.nft')}</h6>
        </div>
      </div>
    </div>
  );
};

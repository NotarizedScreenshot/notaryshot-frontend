import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Profit.module.scss';

export const Profit = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('profit.title')}</h3>
      <p className={styles.description}>{t('profit.description')}</p>
      <div className={styles.list}>
        <div>
          <span className={styles.dot}></span>
          <p>{t('profit.list.p1')}</p>
        </div>
        <div>
          <span className={styles.dot}></span>
          <p>{t('profit.list.p2')}</p>
        </div>
        <div>
          <span className={styles.dot}></span>
          <p>{t('profit.list.p3')}</p>
        </div>
      </div>
    </div>
  );
};

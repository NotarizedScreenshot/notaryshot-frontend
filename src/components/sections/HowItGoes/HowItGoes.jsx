import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HowItGoes.module.scss';

export const HowItGoes = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {t('howItGoes.title.l1')}
        <br />
        {t('howItGoes.title.l2')}
      </h2>
      <div className={styles.box}>
        <div className={styles.number}>1</div>
        <p>{t('howItGoes.p1')}</p>
      </div>
      <div className={styles.box}>
        <div className={styles.number}>2</div>
        <p>{t('howItGoes.p2')}</p>
      </div>
      <div className={styles.box}>
        <div className={styles.number}>3</div>
        <p>{t('howItGoes.p3')}</p>
      </div>
    </div>
  );
};

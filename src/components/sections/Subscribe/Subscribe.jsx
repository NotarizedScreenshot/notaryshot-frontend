import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Subscribe.module.scss';

export const Subscribe = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      {t('subscribe.title')}
      <div>{t('subscribe.placeholder')}</div>
      <div>{t('subscribe.subscribeButton')}</div>
    </div>
  );
};

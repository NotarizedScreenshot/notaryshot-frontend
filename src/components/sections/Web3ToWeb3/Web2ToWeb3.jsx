import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './Web2ToWeb3.module.scss';

export const Web2ToWeb3 = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h1>{t('web2ToWeb3.title')}</h1>
      <div className={cn(styles.box, styles.left)}>
        <p className={styles.description}>{t('web2ToWeb3.description')}</p>
        <p className={styles.list}>
          <span>.</span>
          {t('web2ToWeb3.list.p1')}
        </p>
        <p className={styles.list}>
          <span>.</span>
          {t('web2ToWeb3.list.p2')}
        </p>
        <p className={styles.list}>
          <span>.</span>
          {t('web2ToWeb3.list.p3')}
        </p>
      </div>

      <div className={cn(styles.box, styles.right)}>
        <p>{t('web2ToWeb3.conclusion')}</p>
      </div>
    </div>
  );
};

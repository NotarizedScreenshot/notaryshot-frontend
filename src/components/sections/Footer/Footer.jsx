import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="public/images/logo250.png" alt="footer-logo" />
      </div>

      <div className={styles.copyright}>{t('footer.copyright')}</div>
    </div>
  );
};

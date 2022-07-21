import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Intro.module.scss';

export const Intro = () => {
  const { t } = useTranslation();
  console.log(t('intro.title'));
  return (
    <div className={styles.container}>
      <img className={styles.logo} src="public/images/logo1000.png" alt="logo" />
      <h1>{t('intro.title')}</h1>
      <nav>
        <Link to="/mainform">
          <p>{t('intro.nav.launch')}</p>
        </Link>
        <p>{t('intro.nav.discord')}</p>
        <p>{t('intro.nav.github')}</p>
        <p>{t('intro.nav.telegram')}</p>
      </nav>
      <p>{t('intro.poweredBy')}</p>
      <div className={styles.partners}>
        <div>
          <img src="public/images/polygon.png" />
        </div>
        <div>
          <img src="public/images/ipfs.png" />
        </div>
        <div>
          <img src="public/images/chainlink.png" />
        </div>
        <div>
          <img src="public/images/hyperdapp.png" />
        </div>
      </div>
    </div>
  );
};

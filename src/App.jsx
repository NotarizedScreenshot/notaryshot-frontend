import React from 'react';
import './i18n/index';
import {
  HowItGoes,
  Intro,
  Profit,
  Subscribe,
  Team,
  Verifiable,
  Web2ToWeb3,
} from './components';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.container}>
      <Intro />
      <Verifiable />
      <Web2ToWeb3 />
      <Profit />
      <HowItGoes />
      <Team />
      <Subscribe />
    </div>
  );
};

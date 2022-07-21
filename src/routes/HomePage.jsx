import React from 'react';
import {
  HowItGoes,
  Intro,
  Profit,
  Subscribe,
  Team,
  Verifiable,
  Web2ToWeb3,
} from '../components';

export const HomePage = () => {
  return (
    <>
      <Intro />
      <Verifiable />
      <Web2ToWeb3 />
      <Profit />
      <HowItGoes />
      <Team />
      <Subscribe />
    </>
  );
};
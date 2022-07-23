import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
import { HomePage, MainForm } from './routes';
import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/slicer" exact component={HomePage} />
          <Route path="/mainform" exact component={MainForm} />
          <Route path="*"><Redirect to="/" />
</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

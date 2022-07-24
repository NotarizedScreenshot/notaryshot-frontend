import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { App } from './App';
import './index.scss';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/notarizedscreenshot/notarized-screenshot',
  cache,
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

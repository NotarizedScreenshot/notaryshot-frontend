import React from 'react';
import ReactDOM from 'react-dom/client';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import App from './App';
import { Preview } from 'pages';

const { chains, provider } = configureChains([polygon], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'preview/',
    element: <Preview />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

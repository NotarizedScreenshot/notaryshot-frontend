import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { polygon } from 'wagmi/chains';

import '@rainbow-me/rainbowkit/styles.css';

import './index.scss';
import { Preview, Home, Results, Page404 } from 'pages';
import { io } from 'socket.io-client';
import {
  PreviewContextProvider,
  ConnectionContextProvider,
  FetchingContextProvider,
  ProgressingContextProvider,
  ModalContextProvider,
  TransactionContextProvider,
  ContractContextProvider,
} from 'contexts';

export const socket = io({ autoConnect: true });

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'preview/',
    element: <Preview />,
  },
  {
    path: 'results/',
    element: <Results />,
  },
  { path: '*', element: <Page404 /> },
]);

const { chains, publicClient } = configureChains([polygon], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Quantum Oracle App',
  projectId: process.env.REACT_APP_WALLET_CONNECT_ID!,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <ContractContextProvider>
          <ModalContextProvider>
            <ConnectionContextProvider>
              <PreviewContextProvider>
                <ProgressingContextProvider>
                  <FetchingContextProvider>
                    <TransactionContextProvider>
                      <RouterProvider router={router} />
                    </TransactionContextProvider>
                  </FetchingContextProvider>
                </ProgressingContextProvider>
              </PreviewContextProvider>
            </ConnectionContextProvider>
          </ModalContextProvider>
        </ContractContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
} from 'contexts';

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <ConnectionContextProvider>
        <PreviewContextProvider>
          <ProgressingContextProvider>
            <FetchingContextProvider>
              <TransactionContextProvider>
                <WagmiConfig client={wagmiClient}>
                  <RainbowKitProvider chains={chains} theme={darkTheme()}>
                    <RouterProvider router={router} />
                  </RainbowKitProvider>
                </WagmiConfig>
              </TransactionContextProvider>
            </FetchingContextProvider>
          </ProgressingContextProvider>
        </PreviewContextProvider>
      </ConnectionContextProvider>
    </ModalContextProvider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import { PreviewOld, Preview, Home, Results, Page404 } from 'pages';
import { io } from 'socket.io-client';
import { PreviewContextProvider, ConnectionContextProvider } from 'contexts';

const { chains, provider } = configureChains([polygon, mainnet], [publicProvider()]);

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

// socket.on('users', (users) => {
//   console.log('users', users);
//   console.log('socket id', socket.id);
//   // users.forEach((user: any) => {
//   //   user.self = user.userID === socket.id;
//   //   // initReactiveProperties(user);
//   // });

//   // put the current user first, and then sort by username
//   // this.users = users.sort((a, b) => {
//   //   if (a.self) return -1;
//   //   if (b.self) return 1;
//   //   if (a.username < b.username) return -1;
//   //   return a.username > b.username ? 1 : 0;
//   // });
// });

// socket.on('connectMsg', (message) => {
//   // console.log('socket connect', message);
// });

socket.on('uploadComplete', (message) => {
  console.log('upload complete message', JSON.parse(message));
});

socket.on('uploadProgress', (message) => {
  console.log('progress message', JSON.parse(message));
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'previewOld/',
    element: <PreviewOld />,
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
  // <React.StrictMode>
  <ConnectionContextProvider>
    <PreviewContextProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            // overlayBlur: 'small',
            // borderRadius: 'small',
          })}
        >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </PreviewContextProvider>
  </ConnectionContextProvider>,
  // </React.StrictMode>,
);

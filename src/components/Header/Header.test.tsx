import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './Header';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: () => <button>Connect Wallet</button>,
  useConnectModal: () => ({
    openConnectModal: jest.fn(),
  }),
}));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
  },
]);
describe('test Header component', () => {
  test('if header renders', () => {
    render(<RouterProvider router={router} />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
    const connectButton = screen.getByText('Connect Wallet');
    expect(connectButton).toBeInTheDocument();
  });
});

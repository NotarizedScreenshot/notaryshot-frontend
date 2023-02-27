/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: jest.fn(() => `<div>Conntect</div>`),
  useConnectModal: () => ({
    openConnectModal: jest.fn(),
  }),
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: '0x0',
    isConnected: true,
  }),
}));

beforeEach(async () => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test('if index page rendered', async () => {
  render(<App />);

  const headerElement = screen.getByText('Welcome to Quantum Oracle');
  expect(headerElement).toBeInTheDocument();

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();

  const inputElement = screen.getByPlaceholderText('URL');
  const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
  expect(inputElement).toBeInTheDocument();
  expect(submitButtonElement).toBeInTheDocument();
});

test('if requested screenshot successfully', async () => {
  window.URL.createObjectURL = () => '__fixtures__/twitter-com.png';
  nock('http://localhost')
    .post('/send', JSON.stringify({ url: 'https://twitter.com' }))
    .reply(200, 'testInsteadOfblob');

  render(<App />);
  const headerElement = screen.getByText('Welcome to Quantum Oracle');
  const inputElement = screen.getByPlaceholderText('URL');
  const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
  userEvent.type(inputElement, 'https://twitter.com');
  await act(async () => {
    await userEvent.click(submitButtonElement);
  });

  expect(headerElement).not.toBeVisible();

  const requestingElement = screen.getByText('Requesting...');
  expect(requestingElement).toBeVisible();
  expect(submitButtonElement).toBeDisabled();

  expect(await screen.findByAltText('screenshot')).toBeInTheDocument();
  expect(await screen.findByText('succeed')).toBeInTheDocument();
});

/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';

test('index page rendered', async () => {
  render(<App />);
  const headerElement = screen.getByText('Welcome to Quantum Oracle');
  expect(headerElement).toBeInTheDocument();

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();

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
});

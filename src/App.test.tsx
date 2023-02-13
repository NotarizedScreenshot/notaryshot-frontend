import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const headerElement = screen.getByText('Welcome to Quantum Oracle');
  expect(headerElement).toBeInTheDocument();
  const labelElement = screen.getByText('URL');

  expect(labelElement).toBeInTheDocument();

  const [clearButton, submitButton] = screen.getAllByRole('button');

  await userEvent.click(submitButton);
  await screen.findByText('url is a required field');
  const inputElement = screen.getByRole('textbox');
  userEvent.paste(inputElement, 'some text');
  await userEvent.click(submitButton);
  await screen.findByText('url must be a valid URL');
  await userEvent.click(clearButton);
  expect(screen.queryByText('url is a required field')).not.toBeInTheDocument();
  expect(screen.queryByText('url must be a valid URL')).not.toBeInTheDocument();
});

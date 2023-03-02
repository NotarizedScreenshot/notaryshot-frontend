/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { UrlForm } from './UrlForm';

describe('test url form', () => {
  test('if form rendered', async () => {
    render(<UrlForm onSubmit={async (_) => true} />);
    const labelElement = screen.getByText('URL');
    const inputElement = screen.getByPlaceholderText('URL');
    const clearButtonElement = screen.getByRole('button', { name: 'clear-button' });
    const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).not.toBeVisible();
    expect(inputElement).toBeVisible();
    expect(clearButtonElement).toBeVisible();
    expect(submitButtonElement).toBeVisible();
    expect(inputElement).toHaveValue('');
  });

  test('if error on submit empty', async () => {
    render(<UrlForm onSubmit={async (_) => true} />);
    const inputElement = screen.getByPlaceholderText('URL');
    const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
    const clearButtonElement = screen.getByRole('button', { name: 'clear-button' });
    expect(inputElement).toHaveValue('');
    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    expect(screen.getByText('url is a required field')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(clearButtonElement);
    });

    expect(screen.queryByText('url must be a valid URL')).not.toBeInTheDocument();
    expect(screen.queryByText('url is a required field')).not.toBeInTheDocument();
  });

  test('if error on submit invalid url', async () => {
    render(<UrlForm onSubmit={async (_) => true} />);
    const inputElement = screen.getByPlaceholderText('URL');
    const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
    const clearButtonElement = screen.getByRole('button', { name: 'clear-button' });

    userEvent.type(inputElement, 'someNotUrlSting');

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    expect(screen.getByText('url must be a valid URL')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(clearButtonElement);
    });

    expect(screen.queryByText('url must be a valid URL')).not.toBeInTheDocument();
    expect(screen.queryByText('url is a required field')).not.toBeInTheDocument();
  });

  test('if submit valid url', async () => {
    render(<UrlForm onSubmit={async (_) => true} />);
    const inputElement = screen.getByPlaceholderText('URL');
    const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });

    userEvent.paste(inputElement, 'https://twitter.com');
    await act(async () => {
      await userEvent.click(submitButtonElement);
    });

    expect(screen.queryByText('url must be a valid URL')).not.toBeInTheDocument();
    expect(screen.queryByText('url is a required field')).not.toBeInTheDocument();
  });

  test('if block buttons while submitting', async () => {
    render(
      <UrlForm
        onSubmit={async (_) => {
          return new Promise((resolve) => setTimeout(() => resolve(true), 100));
        }}
      />,
    );
    const submitButtonElement = screen.getByRole('button', { name: 'submit-button' });
    const clearButtonElement = screen.getByRole('button', { name: 'clear-button' });

    const inputElement = screen.getByPlaceholderText('URL');

    userEvent.paste(inputElement, 'https://twitter.com');

    await act(async () => {
      await userEvent.click(submitButtonElement);
    });
    expect(clearButtonElement).toBeDisabled();
    expect(submitButtonElement).toBeDisabled();
  });
});

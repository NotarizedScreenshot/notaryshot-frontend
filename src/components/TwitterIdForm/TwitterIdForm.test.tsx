import { render, screen } from '@testing-library/react';
import { TwitterIdForm } from './TwitterIdForm';
import { validateBigInt } from 'utils';

describe('tweet id form', () => {
  test('if form renders', () => {
    render(<TwitterIdForm validate={validateBigInt} onSubmit={async (value: string) => true} />);
    screen.getByPlaceholderText('tweet id');
    //TODO; add tests
  });
});

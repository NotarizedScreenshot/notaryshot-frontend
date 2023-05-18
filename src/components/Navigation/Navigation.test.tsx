import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './Navigation';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
  },
]);
describe('navigation component', () => {
  test('if navigation rendered', () => {
    render(<RouterProvider router={router} />);

    const gitLink = screen.getByText('GitHub') as HTMLAnchorElement;
    expect(gitLink.tagName).toBe('A');
    expect(new URL(gitLink.href).href).toBe('https://github.com/NotarizedScreenshot');

    const appLink = screen.getByText('Twitter') as HTMLAnchorElement;
    expect(appLink.tagName).toBe('A');
    expect(new URL(appLink.href).href).toBe('https://twitter.com/ChainHackerClan');
  });
});

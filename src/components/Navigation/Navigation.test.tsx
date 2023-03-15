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

    const homeLink = screen.getByText('Home') as HTMLAnchorElement;
    expect(homeLink.tagName).toBe('A');
    expect(new URL(homeLink.href).pathname).toBe('/');

    const teamLink = screen.getByText('Team') as HTMLAnchorElement;
    expect(teamLink.tagName).toBe('A');
    expect(new URL(teamLink.href).pathname).toBe('/');

    const gitLink = screen.getByText('Git') as HTMLAnchorElement;
    expect(gitLink.tagName).toBe('A');
    expect(new URL(gitLink.href).pathname).toBe('/');

    const appLink = screen.getByText('App') as HTMLAnchorElement;
    expect(appLink.tagName).toBe('A');
    expect(new URL(appLink.href).pathname).toBe('/preview');
  });
});

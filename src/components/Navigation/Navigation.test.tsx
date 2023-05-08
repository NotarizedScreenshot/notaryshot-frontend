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

    const homeLink = screen.getAllByText('Home') as HTMLAnchorElement[];
    expect(homeLink[0].tagName).toBe('A');
    expect(new URL(homeLink[0].href).pathname).toBe('/');
    expect(homeLink[1].tagName).toBe('A');
    expect(new URL(homeLink[1].href).pathname).toBe('/');

    // const teamLink = screen.getByText('Team') as HTMLAnchorElement;
    // expect(teamLink.tagName).toBe('A');
    // expect(new URL(teamLink.href).pathname).toBe('/');

    const gitLink = screen.getByText('Git') as HTMLAnchorElement;
    expect(gitLink.tagName).toBe('A');
    expect(new URL(gitLink.href).href).toBe('https://github.com/NotarizedScreenshot');

    const appLink = screen.getByText('App') as HTMLAnchorElement;
    expect(appLink.tagName).toBe('A');
    expect(new URL(appLink.href).pathname).toBe('/preview');
  });
});

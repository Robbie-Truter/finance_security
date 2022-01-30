import { render, screen } from '@testing-library/react';
import ReactRouter from './navbar/React-Router';

test('renders learn react link', () => {
  render(<ReactRouter />);
  const linkElement = screen.getByText(/some text/i);
  expect(linkElement).toBeInTheDocument();
});

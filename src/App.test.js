import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the SFA homepage', () => {
  render(<App />);
  const logoElements = screen.getAllByText(/SFA/i);
  expect(logoElements.length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: /National Day group/i })).toBeInTheDocument();
});

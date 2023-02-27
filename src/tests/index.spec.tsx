import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('Simple working test', () => {
  it('should show the title', () => {
    render(<App />);

    expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
  });
});

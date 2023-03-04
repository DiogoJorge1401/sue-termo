import { render, screen } from '@testing-library/react';
import App, { AppFooter, AppHeader } from './App';
import {
  GameContext,
  initialState,
  TOTAL_WORDS
} from './context/Game';

describe('App', () => {
  it('should renders App component without crashing', () => {
    render(<App />);
  });

  it('should renders AppHeader component', () => {
    render(<AppHeader />);
    const headerElement = screen.getByText(/SueTermo/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('should renders AppFooter component', () => {
    render(<AppFooter />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it("should renders 'Acertou vagabundo!' when player wins", () => {
    const state = { ...initialState, isWinner: true };

    const { getByText } = render(
      <GameContext.Provider value={state}>
        <App />
      </GameContext.Provider>
    );

    const messageElement = getByText(/Acertou vagabundo!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("should renders 'Perdeu otário!' when player loses", () => {
    const state = { ...initialState, isLoser: true };

    const { getByText } = render(
      <GameContext.Provider value={state}>
        <App />
      </GameContext.Provider>
    );

    const messageElement = getByText(/Perdeu otário!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it('should renders the correct WordRows', () => {
    const state = {
      ...initialState,
      words: Array.from({ length: TOTAL_WORDS }, () => ({
        word: '',
        hasAlreadyBeenFilled: false
      }))
    };

    const { container } = render(
      <GameContext.Provider value={state}>
        <App />
      </GameContext.Provider>
    );

    const wordRows = container.querySelectorAll('#word-row');

    expect(wordRows).toHaveLength(TOTAL_WORDS);
  });
});

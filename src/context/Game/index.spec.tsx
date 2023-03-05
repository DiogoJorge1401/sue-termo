import { render, screen, waitFor } from '@testing-library/react';
import { GameContextProvider, useGame } from '.';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('GameContextProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders provider with correct value and children', () => {
    render(
      <GameContextProvider>
        <div>Test Children</div>
      </GameContextProvider>
    );

    const children = screen.getByText('Test Children');

    expect(children).toBeInTheDocument();
  });

  it('should initializes game state correctly', () => {
    vi.mock('../../utils/wordBank', () => ({
      getRandomWord: vi.fn().mockReturnValue('teste')
    }));

    const TestComponent = () => {
      const {
        correctWord,
        currentWordIndex,
        isLoser,
        isWinner,
        words
      } = useGame();

      return (
        <div>
          <span>isWinner: {isWinner.toString()}</span>
          <span>isLoser: {isLoser.toString()}</span>
          <span>currentWordIndex: {currentWordIndex}</span>
          <span>words: {JSON.stringify(words)}</span>
          <span>correctWord: {correctWord}</span>
        </div>
      );
    };

    const { getByText } = render(
      <GameContextProvider>
        <TestComponent />
      </GameContextProvider>
    );

    expect(getByText('isWinner: false')).toBeInTheDocument();
    expect(getByText('isLoser: false')).toBeInTheDocument();
    expect(getByText('currentWordIndex: 0')).toBeInTheDocument();
    expect(getByText('correctWord: teste')).toBeInTheDocument();
    expect(
      getByText(
        'words: [{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false}]'
      )
    ).toBeInTheDocument();
  });

  it('should updates isWinner correctly', async () => {
    const TestComponent = () => {
      const { isWinner, setIsWinner } = useGame();

      return (
        <div>
          <span>isWinner: {isWinner.toString()}</span>

          <button onClick={() => setIsWinner(true)}>
            Set Winner
          </button>
        </div>
      );
    };

    const { getByText } = render(
      <GameContextProvider>
        <TestComponent />
      </GameContextProvider>
    );

    const button = getByText('Set Winner');

    act(() => button.click());

    await waitFor(() =>
      expect(getByText('isWinner: true')).toBeInTheDocument()
    );
  });

  it('should updates isLoser correctly', async () => {
    const TestComponent = () => {
      const { isLoser, setIsLoser } = useGame();

      return (
        <div>
          <span>isLoser: {isLoser.toString()}</span>

          <button onClick={() => setIsLoser(true)}>Set Loser</button>
        </div>
      );
    };

    const { getByText } = render(
      <GameContextProvider>
        <TestComponent />
      </GameContextProvider>
    );

    const button = getByText('Set Loser');

    act(() => button.click());

    await waitFor(() =>
      expect(getByText('isLoser: true')).toBeInTheDocument()
    );
  });

  it('should updates words state correctly', async () => {
    const TestComponent = () => {
      const { words, setWords } = useGame();

      const updateWord = (wordIndex: number, newWord: string) => {
        const newWords = [...words];
        newWords[wordIndex].word = newWord;
        setWords(newWords);
      };

      return (
        <div>
          <span>words: {JSON.stringify(words)}</span>

          <button onClick={() => updateWord(0, 'new-word')}>
            Update Word
          </button>
        </div>
      );
    };

    const { getByText } = render(
      <GameContextProvider>
        <TestComponent />
      </GameContextProvider>
    );

    const button = getByText('Update Word');

    act(() => button.click());

    await waitFor(() =>
      expect(
        getByText(
          'words: [{"word":"new-word","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false},{"word":"","hasAlreadyBeenFilled":false}]'
        )
      ).toBeInTheDocument()
    );
  });
});

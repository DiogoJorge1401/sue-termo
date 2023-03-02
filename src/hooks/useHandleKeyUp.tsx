import { useCallback, useEffect } from 'react';
import { useGame, WORD_LENGTH } from '../context/Game';
import { EnterProps } from './useCommands';

interface Props {
  handleBackspace(): void;
  handleEnter(p: EnterProps): void;
}

const isLetter = (str: string) => /^[a-zA-Z]+$/.test(str);

export const useHandleKeyUp = ({
  handleEnter,
  handleBackspace
}: Props) => {
  const {
    words,
    correctWord,
    isLoser,
    isWinner,
    currentWordIndex,
    setWords,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner
  } = useGame();

  const handleEnterKey = useCallback(() => {
    handleEnter({
      correctWord,
      isWinner,
      setCurrentWordIndex,
      setIsLoser,
      setIsWinner
    });
  }, [
    correctWord,
    isWinner,
    handleEnter,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner
  ]);

  const handleBackspaceKey = useCallback(() => {
    handleBackspace();
  }, [handleBackspace]);

  const handleLetterKey = useCallback(
    (key: string) => {
      if (!isLetter(key)) return;

      setWords((prev) => {
        const copy = [...prev];
        const { word, hasAlreadyBeenFilled } =
          copy[currentWordIndex];

        if (word.length >= WORD_LENGTH) return copy;

        const updatedWord = word + key;
        copy.splice(currentWordIndex, 1, {
          hasAlreadyBeenFilled,
          word: updatedWord
        });

        return copy;
      });
    },
    [currentWordIndex, setWords]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      const handlers = {
        Enter: handleEnterKey,
        Backspace: handleBackspaceKey
      };

      const handler =
        handlers[key as keyof typeof handlers];

      if (handler) handler();
      if (key.length === 1) handleLetterKey(key);
    },
    [handleEnterKey, handleBackspaceKey, handleLetterKey]
  );

  useEffect(() => {
    if (isWinner || isLoser) {
      window.removeEventListener('keyup', handleKeyUp);
    } else {
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [words, currentWordIndex, isWinner, isLoser]);
};

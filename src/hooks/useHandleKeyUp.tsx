import { Dispatch, SetStateAction, useEffect } from 'react';
import { LETTERS_LENGTH, WordState } from '../App';
import { EnterProps } from './useCommands';

interface Props {
  correctWord: string;
  currentWordIndex: number;
  isLoser: boolean;
  isWinner: boolean;
  words: WordState[];
  setWords: Dispatch<SetStateAction<WordState[]>>;
  handleBackspace(): void;
  handleEnter(p: EnterProps): void;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  setIsLoser: Dispatch<SetStateAction<boolean>>;
  setIsWinner: Dispatch<SetStateAction<boolean>>;
}

export const useHandleKeyUp = ({
  words,
  isLoser,
  isWinner,
  correctWord,
  currentWordIndex,
  setWords,
  handleBackspace,
  handleEnter,
  setCurrentWordIndex,
  setIsLoser,
  setIsWinner
}: Props) => {
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key.length > 1) {
      switch (e.key) {
        case 'Enter':
          return handleEnter({
            correctWord,
            isWinner,
            setCurrentWordIndex,
            setIsLoser,
            setIsWinner
          });
        case 'Backspace':
          return handleBackspace();
      }
      return;
    }

    if (isNaN(+e.key)) {
      setWords((prev) => {
        const copy = [...prev];

        const { word, hasAlreadyBeenFilled } =
          copy[currentWordIndex];

        if (word.length >= LETTERS_LENGTH) return copy;

        let updatedWord = word + e.key;

        copy.splice(currentWordIndex, 1, {
          hasAlreadyBeenFilled,
          word: updatedWord
        });

        return copy;
      });
    }
  };

  useEffect(() => {
    if (isWinner || isLoser)
      return window.removeEventListener(
        'keyup',
        handleKeyUp
      );

    window.addEventListener('keyup', handleKeyUp);

    return () =>
      window.removeEventListener('keyup', handleKeyUp);
  }, [words, currentWordIndex, isWinner, isLoser]);
};

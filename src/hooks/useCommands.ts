import { SetStateAction } from 'react';
import {
  LETTERS_LENGTH,
  TOTAL_WORDS,
  WordState
} from '../App';
import { checkIfExists } from '../utils/word-utils';

export interface EnterProps {
  correctWord: string;
  isWinner: boolean;
  setIsWinner: (value: SetStateAction<boolean>) => void;
  setIsLoser: (value: SetStateAction<boolean>) => void;
  setCurrentWordIndex: (
    value: SetStateAction<number>
  ) => void;
}

interface UseCommandProps {
  words: WordState[];
  currentWordIndex: number;
  setWords: (value: SetStateAction<WordState[]>) => void;
}

export const useCommands = ({
  currentWordIndex,
  words,
  setWords
}: UseCommandProps) => {
  const handleEnter = ({
    correctWord,
    isWinner,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner
  }: EnterProps) => {
    const { word } = words[currentWordIndex];

    if (word.length < LETTERS_LENGTH) return;

    if (!checkIfExists(word)) return;

    const copiedWords = [...words];

    copiedWords.splice(currentWordIndex, 1, {
      hasAlreadyBeenFilled: true,
      word
    });

    if (word === correctWord) {
      setWords(copiedWords);
      return setIsWinner(true);
    }

    const nextIndex = 1;

    const quantityOfWords = currentWordIndex + nextIndex;

    if (!isWinner && quantityOfWords === TOTAL_WORDS)
      setIsLoser(true);

    setCurrentWordIndex((prev) => prev + 1);

    return setWords(copiedWords);
  };

  const handleBackspace = () => {
    const { word } = words[currentWordIndex];

    if (!word.length) return;

    return setWords((prev) => {
      const copy = [...prev];

      const { word, hasAlreadyBeenFilled } =
        copy[currentWordIndex];

      let updatedWord = word.substring(0, word.length - 1);

      copy.splice(currentWordIndex, 1, {
        hasAlreadyBeenFilled,
        word: updatedWord
      });

      return copy;
    });
  };

  return { handleBackspace, handleEnter };
};

import { SetStateAction } from 'react';
import {
  TOTAL_WORDS,
  useGame,
  WORD_LENGTH
} from '../context/Game';
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

export const useCommands = () => {
  const { words, currentWordIndex, setWords } = useGame();

  const handleEnter = ({
    correctWord,
    isWinner,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner
  }: EnterProps) => {
    const { word } = words[currentWordIndex];

    if (word.length < WORD_LENGTH || !checkIfExists(word))
      return;

    const copiedWords = [...words];

    copiedWords.splice(currentWordIndex, 1, {
      hasAlreadyBeenFilled: true,
      word
    });

    if (word === correctWord) {
      setWords(copiedWords);
      setIsWinner(true);
      return;
    }

    const wordOffset = 1;

    const nextIndex = currentWordIndex + wordOffset;

    if (!isWinner && nextIndex === TOTAL_WORDS)
      setIsLoser(true);

    setCurrentWordIndex((prev) => prev + 1);

    setWords(copiedWords);
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

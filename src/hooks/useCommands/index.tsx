import { useCallback } from 'react';
import {
  TOTAL_WORDS,
  useGame,
  WORD_LENGTH
} from '../../context/Game';
import { checkIfExists } from '../../utils/wordBank';

export const useCommands = () => {
  const {
    words,
    currentWordIndex,
    correctWord,
    isWinner,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner,
    setWords
  } = useGame();

  const handleEnter = useCallback(() => {
    const { word } = words[currentWordIndex];

    if (word.length < WORD_LENGTH || !checkIfExists(word)) return;

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

    if (!isWinner && nextIndex === TOTAL_WORDS) setIsLoser(true);

    setCurrentWordIndex(currentWordIndex + 1);

    setWords(copiedWords);
  }, [
    words,
    currentWordIndex,
    correctWord,
    setWords,
    setIsWinner,
    setIsLoser,
    setCurrentWordIndex
  ]);

  const handleBackspace = useCallback(() => {
    const { word } = words[currentWordIndex];

    if (!word.length) return;

    const copy = [...words];

    const updatedWord = word.substring(0, word.length - 1);

    copy.splice(currentWordIndex, 1, {
      hasAlreadyBeenFilled: false,
      word: updatedWord
    });

    setWords(copy);
  }, [words, currentWordIndex, setWords]);

  const handleLetter = useCallback(
    (letter: string) => {
      const { word } = words[currentWordIndex];

      if (word.length >= WORD_LENGTH) return;

      const copy = [...words];

      const updatedWord = word + letter;

      copy.splice(currentWordIndex, 1, {
        hasAlreadyBeenFilled: false,
        word: updatedWord
      });

      setWords(copy);
    },
    [words, currentWordIndex, setWords]
  );

  return { handleBackspace, handleEnter, handleLetter };
};

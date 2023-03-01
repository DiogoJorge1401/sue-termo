import { useState } from 'react';
import { WordRow } from './components/WordRow';
import { useCommands } from './hooks/useCommands';
import { useHandleKeyUp } from './hooks/useHandleKeyUp';
import { getRandomWord } from './utils/word-utils';

export interface WordState {
  word: string;
  hasAlreadyBeenFilled: boolean;
}

export const LETTERS_LENGTH = 5;
export const TOTAL_WORDS = 6;

export const App = () => {
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] =
    useState(0);
  const [words, setWords] = useState<Array<WordState>>(
    Array.from({ length: TOTAL_WORDS }, () => ({
      word: '',
      hasAlreadyBeenFilled: false
    }))
  );
  const [correctWord] = useState(() => getRandomWord());

  const { handleBackspace, handleEnter } = useCommands({
    words,
    currentWordIndex,
    setWords
  });

  useHandleKeyUp({
    correctWord,
    currentWordIndex,
    isLoser,
    isWinner,
    words,
    setWords,
    handleBackspace,
    handleEnter,
    setCurrentWordIndex,
    setIsLoser,
    setIsWinner
  });

  console.log(correctWord);

  return (
    <div className="w-full h-screen bg-rose-myRose text-white ">
      <div className="w-96 mx-auto pt-2">
        <AppHeader />

        <main className="flex flex-col gap-3">
          {words.map((letters, idx) => (
            <WordRow
              rowNumber={idx}
              currentRow={currentWordIndex}
              correctWord={correctWord.split('')}
              lettersProp={letters}
              key={idx}
            />
          ))}
        </main>

        <AppFooter isLoser={isLoser} isWinner={isWinner} />
      </div>
    </div>
  );
};

const AppHeader = () => (
  <header className="border-b-2 border-white pb-2 mb-3">
    <h1 className="text-4xl text-center font-bold">
      SueTermo
    </h1>
  </header>
);

const AppFooter = ({
  isWinner,
  isLoser
}: {
  isWinner: boolean;
  isLoser: boolean;
}) => (
  <footer>
    {isWinner && <p>Acertou vagabundo!</p>}
    {isLoser && <p>Perdeu otário!</p>}
  </footer>
);

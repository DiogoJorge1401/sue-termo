import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

import { getRandomWord } from '../../utils/wordBank';
import { GameState, WordState } from './types';

export const WORD_LENGTH = 5;
export const TOTAL_WORDS = 6;

const initialState: GameState = {
  isWinner: false,
  isLoser: false,
  currentWordIndex: 0,
  words: [],
  correctWord: ''
} as unknown as GameState;

const GameContext = createContext(initialState);

export const GameContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] =
    useState(0);
  const [words, setWords] = useState<WordState[]>(
    Array.from({ length: TOTAL_WORDS }, () => ({
      word: '',
      hasAlreadyBeenFilled: false
    }))
  );
  const [correctWord] = useState(() => getRandomWord());

  console.log(correctWord);

  return (
    <GameContext.Provider
      value={{
        isWinner,
        setIsWinner,
        isLoser,
        setIsLoser,
        currentWordIndex,
        setCurrentWordIndex,
        words,
        setWords,
        correctWord
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

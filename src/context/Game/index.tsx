import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

import { getRandomWord } from '../../utils/word-utils';

export interface WordState {
  word: string;
  hasAlreadyBeenFilled: boolean;
}

enum LetterState {
  Won,
  Exist,
  Exact,
  NotExists
}

export type LetterStateValue = keyof typeof LetterState;
interface GameState {
  isWinner: boolean;
  setIsWinner: Dispatch<SetStateAction<boolean>>;
  isLoser: boolean;
  setIsLoser: Dispatch<SetStateAction<boolean>>;
  currentWordIndex: number;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  words: WordState[];
  setWords: Dispatch<SetStateAction<WordState[]>>;
  correctWord: string;
}
interface GameState {
  isWinner: boolean;
  setIsWinner: Dispatch<SetStateAction<boolean>>;
  isLoser: boolean;
  setIsLoser: Dispatch<SetStateAction<boolean>>;
  currentWordIndex: number;
  setCurrentWordIndex: Dispatch<SetStateAction<number>>;
  words: WordState[];
  setWords: Dispatch<SetStateAction<WordState[]>>;
  correctWord: string;
}

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

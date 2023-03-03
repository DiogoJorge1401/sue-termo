import { Dispatch, SetStateAction } from 'react';

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

export interface GameState {
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

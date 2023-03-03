import { SetStateAction } from 'react';

export interface EnterProps {
  correctWord: string;
  isWinner: boolean;
  setIsWinner: (value: SetStateAction<boolean>) => void;
  setIsLoser: (value: SetStateAction<boolean>) => void;
  setCurrentWordIndex: (
    value: SetStateAction<number>
  ) => void;
}

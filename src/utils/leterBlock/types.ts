import { LetterBlockProps } from '../../components/LetterBlock';
import { LetterStateValue } from '../../context/Game/types';

export interface GetLetterStatusProps {
  letterGuessed: string;
  correctWord: string;
  correctLetterIdx: number;
  isWinner: boolean;
  isRowActive: boolean;
}

export type WordColStatus = LetterStateValue | undefined;

export interface GenerateLetterBlockProps {
  letters: string[];
  correctWord: string;
  hasAlreadyBeenFilled: boolean;
  isWinner: boolean;
  isRowActive: boolean;
  LetterComponent: React.FC<LetterBlockProps>;
}

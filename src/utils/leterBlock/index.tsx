import { WORD_LENGTH } from '../../context/Game';

import {
  GenerateLetterBlockProps,
  GetLetterStatusProps,
  WordColStatus
} from './types';

export const getLetterStatus = ({
  letterGuessed,
  correctWord,
  correctLetterIdx,
  isWinner,
  isRowActive
}: GetLetterStatusProps): WordColStatus => {
  if (letterGuessed === correctWord[correctLetterIdx]) {
    return isWinner && isRowActive ? 'Won' : 'Exact';
  }

  return correctWord.includes(letterGuessed) ? 'Exist' : 'NotExists';
};

export const generateLetterBlocks = ({
  letters,
  isWinner,
  isRowActive,
  LetterComponent,
  correctWord,
  hasAlreadyBeenFilled
}: GenerateLetterBlockProps): JSX.Element[] => {
  const wordColumns = hasAlreadyBeenFilled
    ? Array.from({ length: WORD_LENGTH }, (_, idx) => {
        const letter = letters[idx] || ' ';

        const status = getLetterStatus({
          letterGuessed: letter,
          correctLetterIdx: idx,
          correctWord,
          isWinner,
          isRowActive
        });

        return (
          <LetterComponent
            letter={letter}
            status={status}
            delay={idx}
            key={idx}
          />
        );
      })
    : letters.map((letter, i) => (
        <LetterComponent letter={letter} key={i} />
      ));

  return wordColumns;
};

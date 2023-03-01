import { ReactElement } from 'react';
import { WordState } from '../../App';
import { WordCol } from '../WordCol';

const LETTERS_LENGTH = 5;

interface Props {
  lettersProp: WordState;
  correctWord: string[];
  rowNumber: number;
  currentRow: number;
}

type WordColStatus = 'exact' | 'exist' | undefined;

const generateWordCols = (
  letters: string[],
  correctWord: string[]
): ReactElement[] => {
  const wordCols: ReactElement[] = [];

  for (let i = 0; i < LETTERS_LENGTH; i++) {
    const char = letters[i] || ' ';

    const status: WordColStatus =
      char === correctWord[i]
        ? 'exact'
        : correctWord.includes(char)
        ? 'exist'
        : undefined;

    wordCols.push(
      <WordCol char={char} key={i} status={status} />
    );
  }

  return wordCols;
};

export const WordRow = ({
  lettersProp: { hasAlreadyBeenFilled, word },
  correctWord,
  currentRow,
  rowNumber
}: Props) => {
  const isRowActive = currentRow === rowNumber;
  const rowClass = isRowActive
    ? 'shadow-sm rounded shadow-white'
    : '';

  const letters = word
    .padEnd(LETTERS_LENGTH, ' ')
    .split('');

  const wordColumns: ReactElement[] = hasAlreadyBeenFilled
    ? generateWordCols(letters, correctWord)
    : letters.map((char, i) => (
        <WordCol char={char} key={i} />
      ));
  return (
    <div
      className={[
        'text-2xl flex gap-1 justify-between p-2',
        rowClass
      ].join(' ')}
    >
      {wordColumns}
    </div>
  );
};

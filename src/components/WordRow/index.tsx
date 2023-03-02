import {
  LetterStateValue,
  useGame,
  WordState
} from '../../context/Game';
import { LetterBlock } from '../LetterBlock';

const LETTERS_LENGTH = 5;

interface Props {
  lettersProp: WordState;
  rowNumber: number;
}

type WordColStatus = LetterStateValue | undefined;

interface GenerateLetterBlockProps {
  letters: string[];
  correctWordSplitted: string[];
  hasAlreadyBeenFilled: boolean;
  isWinner: boolean;
  isRowActive: boolean;
}

const generateLetterBlocks = ({
  letters,
  correctWordSplitted,
  hasAlreadyBeenFilled,
  isWinner,
  isRowActive
}: GenerateLetterBlockProps): JSX.Element[] => {
  const wordColumns = hasAlreadyBeenFilled
    ? Array.from({ length: LETTERS_LENGTH }, (_, i) => {
        const letter = letters[i] || ' ';

        const status: WordColStatus =
          letter === correctWordSplitted[i]
            ? isWinner && isRowActive
              ? 'Won'
              : 'Exact'
            : correctWordSplitted.includes(letter)
            ? 'Exist'
            : 'NotExists';

        return (
          <LetterBlock
            letter={letter}
            key={i}
            status={status}
            delay={i}
          />
        );
      })
    : letters.map((letter, i) => (
        <LetterBlock letter={letter} key={i} />
      ));

  return wordColumns;
};

export const WordRow = ({
  lettersProp: { hasAlreadyBeenFilled, word },
  rowNumber
}: Props) => {
  const { currentWordIndex, correctWord, isWinner } =
    useGame();
  const correctWordSplitted = correctWord.split('');

  const isRowActive = currentWordIndex === rowNumber;

  const rowClass = isRowActive ? 'shadow-md rounded' : '';

  const letters = word
    .padEnd(LETTERS_LENGTH, ' ')
    .split('');

  const wordColumns = generateLetterBlocks({
    letters,
    correctWordSplitted,
    hasAlreadyBeenFilled,
    isWinner,
    isRowActive
  });

  return (
    <div
      className={`text-2xl flex gap-1 justify-between p-2 ${rowClass}`}
    >
      {wordColumns}
    </div>
  );
};

import { useGame, WORD_LENGTH } from '../../context/Game';
import { WordState } from '../../context/Game/types';
import { generateLetterBlocks } from '../../utils/leterBlock';
import { LetterBlock } from '../LetterBlock';

interface Props {
  lettersProp: WordState;
  rowNumber: number;
}

export const WordRow = ({
  lettersProp: { hasAlreadyBeenFilled, word },
  rowNumber
}: Props) => {
  const { currentWordIndex, correctWord, isWinner } = useGame();

  const isRowActive = currentWordIndex === rowNumber;

  const rowClass = isRowActive ? 'shadow-md rounded' : '';

  const letters = word.padEnd(WORD_LENGTH, ' ').split('');

  const wordColumns = generateLetterBlocks({
    letters,
    isWinner,
    isRowActive,
    correctWord,
    hasAlreadyBeenFilled,
    LetterComponent: LetterBlock
  });

  return (
    <div
      id="word-row"
      className={`${rowClass} w-full max-w-xs flex justify-center gap-2 py-2 px-2 mx-auto sm:justify-around sm:gap-0 sm:px-1 lg:gap-2 lg:py-1 lg:px-2`}
    >
      {wordColumns}
    </div>
  );
};

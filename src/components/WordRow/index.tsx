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
  const { currentWordIndex, correctWord, isWinner } =
    useGame();

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
      className={`text-2xl flex gap-1 justify-between p-2 ${rowClass}`}
    >
      {wordColumns}
    </div>
  );
};

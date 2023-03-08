import { useEffect, useState } from 'react';
import { LetterStateValue } from '../../context/Game/types';

export interface LetterBlockProps {
  letter: string;
  status?: LetterStateValue;
  delay?: number;
}

export const ANIMATION_DELAY = 350;

const getLetterBlockClasses = (
  status: LetterBlockProps['status']
) => {
  const animation = 'animate-place';

  switch (status) {
    case 'Won':
      return `bg-palette-Won text-palette-WonColor ${animation}`;
    case 'Exact':
      return `bg-palette-Exact text-white ${animation}`;
    case 'Exist':
      return `bg-palette-Exist ${animation}`;
    case 'NotExists':
      return `bg-palette-NotExists ${animation}`;
    default:
      return 'bg-palette-letter';
  }
};

export const LetterBlock = ({
  letter,
  status,
  delay = 0
}: LetterBlockProps) => {
  const [statusClasses, setStatusClasses] = useState('');

  const applyStatusClass = () => {
    setStatusClasses(getLetterBlockClasses(status));
  };

  const animateBlock = () => {
    setTimeout(applyStatusClass, delay * ANIMATION_DELAY);
  };

  useEffect(() => {
    if (!status) return setStatusClasses('bg-palette-letter');
    animateBlock();
  }, [status]);

  return (
    <div
      className={`h-14 w-14 flex justify-center items-center text-base font-semibold uppercase rounded-md border-2 ${statusClasses}`}
    >
      {letter}
    </div>
  );
};

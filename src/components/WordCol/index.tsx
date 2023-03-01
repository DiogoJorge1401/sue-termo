import { useEffect, useState } from 'react';

interface Props {
  char: string;
  status?: 'exist' | 'exact';
}

export const WordCol = ({ char, status }: Props) => {
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    if (status === 'exact')
      return setStatusColor('bg-statusColor-exact');
    if (status === 'exist')
      return setStatusColor('bg-statusColor-exist');
  }, [status]);

  return (
    <div
      className={[
        'w-1/6 h-16 border-2 flex items-center justify-center text-2xl rounded-md shadow-lg uppercase font-bold',
        statusColor
      ].join(' ')}
    >
      {char}
    </div>
  );
};

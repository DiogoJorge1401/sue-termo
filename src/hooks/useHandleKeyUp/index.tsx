import { useCallback, useEffect } from 'react';
import { useCommands } from '..';
import { Handlers, UseHandleKeyUpProps } from './types';

const isLetter = (str: string) => /^[a-zA-Z]+$/.test(str);

export const useHandleKeyUp = ({
  isLoser,
  isWinner
}: UseHandleKeyUpProps) => {
  const { handleBackspace, handleEnter, handleLetter } =
    useCommands();

  const handleEnterKey = useCallback(() => {
    handleEnter();
  }, [handleEnter]);

  const handleBackspaceKey = useCallback(() => {
    handleBackspace();
  }, [handleBackspace]);

  const handleLetterKey = useCallback(
    (key: string) => {
      if (!isLetter(key)) return;
      handleLetter(key);
    },
    [handleLetter]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      const handlers: Handlers = {
        Enter: handleEnterKey,
        Backspace: handleBackspaceKey
      };

      const handler = handlers[key as keyof Handlers];

      if (handler) handler();
      if (key.length === 1) handleLetterKey(key.toLowerCase());
    },
    [handleEnterKey, handleBackspaceKey, handleLetterKey]
  );

  useEffect(() => {
    if (isWinner || isLoser) {
      window.removeEventListener('keyup', handleKeyUp);
    } else {
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);
};

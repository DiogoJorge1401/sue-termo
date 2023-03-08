import { checkIfExists } from '../../utils/wordBank';
import { useGame } from '../../context/Game';
import { useCommands } from '.';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../../utils/wordBank');
jest.mock('../../context/Game');

describe('useCommands', () => {
  let setWords: jest.Mock;
  let setIsWinner: jest.Mock;
  let setIsLoser: jest.Mock;
  let setCurrentWordIndex: jest.Mock;

  beforeEach(() => {
    setWords = jest.fn();
    setIsWinner = jest.fn();
    setIsLoser = jest.fn();
    setCurrentWordIndex = jest.fn();

    (checkIfExists as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleEnter', () => {
    it('should calls setWords and setWinner when correct word is entered', () => {
      const words = [
        { hasAlreadyBeenFilled: true, word: 'apple' },
        { hasAlreadyBeenFilled: true, word: 'melon' },
        { hasAlreadyBeenFilled: false, word: 'limon' }
      ];
      const correctWord = 'limon';
      const currentWordIndex = 2;
      const isWinner = false;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        setIsWinner,
        setIsLoser,
        setCurrentWordIndex,
        words,
        correctWord,
        currentWordIndex,
        isWinner
      });

      const {
        result: {
          current: { handleEnter }
        }
      } = renderHook(() => useCommands());

      act(() => handleEnter());

      expect(setWords).toHaveBeenCalledWith([
        ...words.slice(0, 2),
        { hasAlreadyBeenFilled: true, word: 'limon' }
      ]);
      expect(setIsWinner).toHaveBeenCalledWith(true);
      expect(setIsLoser).not.toHaveBeenCalled();
      expect(setCurrentWordIndex).not.toHaveBeenCalled();
    });

    it('should calls setCurrentWordIndex when icorrect word is entered', () => {
      const words = [
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: false, word: 'teste' }
      ];
      const correctWord = 'carro';
      const currentWordIndex = 2;
      const isWinner = false;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        setIsWinner,
        setIsLoser,
        setCurrentWordIndex,
        words,
        correctWord,
        currentWordIndex,
        isWinner
      });

      const {
        result: {
          current: { handleEnter }
        }
      } = renderHook(() => useCommands());

      act(() => handleEnter());

      expect(setWords).toHaveBeenCalledWith([
        ...words.slice(0, 2),
        { hasAlreadyBeenFilled: true, word: 'teste' }
      ]);
      expect(setCurrentWordIndex).toHaveBeenCalledWith(3);
      expect(setIsWinner).not.toHaveBeenCalled();
      expect(setIsLoser).not.toHaveBeenCalled();
    });

    it('should calls setIsLoser when player enters an incorrect word on the last attempt', () => {
      const words = [
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: true, word: 'teste' },
        { hasAlreadyBeenFilled: false, word: 'leite' }
      ];
      const correctWord = 'carro';
      const currentWordIndex = 5;
      const isWinner = false;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        setIsWinner,
        setIsLoser,
        setCurrentWordIndex,
        words,
        correctWord,
        currentWordIndex,
        isWinner
      });

      const {
        result: {
          current: { handleEnter }
        }
      } = renderHook(() => useCommands());

      act(() => handleEnter());

      expect(setWords).toHaveBeenCalledWith([
        ...words.slice(0, 5),
        { hasAlreadyBeenFilled: true, word: 'leite' }
      ]);
      expect(setCurrentWordIndex).toHaveBeenCalledWith(6);
      expect(setIsLoser).toHaveBeenCalledWith(true);
      expect(setIsWinner).not.toHaveBeenCalled();
    });

    it('should not updates words when player enters a word too short', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: 't' }];
      const currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        setIsWinner,
        setIsLoser,
        setCurrentWordIndex,
        currentWordIndex,
        words
      });

      const {
        result: {
          current: { handleEnter }
        }
      } = renderHook(() => useCommands());

      act(() => handleEnter());

      expect(setWords).not.toHaveBeenCalled();
      expect(setCurrentWordIndex).not.toHaveBeenCalled();
      expect(setIsLoser).not.toHaveBeenCalled();
      expect(setIsWinner).not.toHaveBeenCalled();
    });

    it('should not updates words when player enters a word that does not exist', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: 'teste' }];
      const currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        setIsWinner,
        setIsLoser,
        setCurrentWordIndex,
        currentWordIndex,
        words
      });

      (checkIfExists as jest.Mock).mockReturnValue(false);

      const {
        result: {
          current: { handleEnter }
        }
      } = renderHook(() => useCommands());

      act(() => handleEnter());

      expect(setWords).not.toHaveBeenCalled();
      expect(setCurrentWordIndex).not.toHaveBeenCalled();
      expect(setIsLoser).not.toHaveBeenCalled();
      expect(setIsWinner).not.toHaveBeenCalled();
    });
  });

  describe('handleBackspace', () => {
    it('should removes the last character of the current word when is called', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: 'manos' }];
      const currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        words,
        currentWordIndex
      });

      const {
        result: {
          current: { handleBackspace }
        }
      } = renderHook(() => useCommands());

      act(() => handleBackspace());

      expect(setWords).toBeCalledWith([
        { hasAlreadyBeenFilled: false, word: 'mano' }
      ]);
    });

    it('should not removes any character when is called with an empty word', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: '' }];
      const currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        setWords,
        words,
        currentWordIndex
      });

      const {
        result: {
          current: { handleBackspace }
        }
      } = renderHook(() => useCommands());

      act(() => handleBackspace());

      expect(setWords).not.toBeCalled();
    });
  });

  describe('handleEnter', () => {
    it('should adds a letter to the current word when is called', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: '' }],
        currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        words,
        currentWordIndex,
        setWords
      });

      const {
        result: {
          current: { handleLetter }
        }
      } = renderHook(() => useCommands());

      act(() => handleLetter('a'));

      expect(setWords).toHaveBeenCalledWith([
        {
          hasAlreadyBeenFilled: false,
          word: 'a'
        }
      ]);
    });

    it('should not adds a letter to the current word when the word is already at the maximum', () => {
      const words = [{ hasAlreadyBeenFilled: false, word: 'aaaaa' }],
        currentWordIndex = 0;

      (useGame as jest.Mock).mockReturnValue({
        words,
        currentWordIndex,
        setWords
      });

      const {
        result: {
          current: { handleLetter }
        }
      } = renderHook(() => useCommands());

      act(() => {
        handleLetter('a');
      });

      expect(setWords).not.toHaveBeenCalled();
    });
  });
});

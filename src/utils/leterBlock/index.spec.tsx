import { generateLetterBlocks, getLetterStatus } from '.';

describe('letterBlock', () => {
  describe('getLetterStatus', () => {
    const correctWord = 'teste';

    it("should return 'Exact' if the guessed letter is in the correct possition", () => {
      const letterStatus = getLetterStatus({
        letterGuessed: 't',
        correctWord,
        correctLetterIdx: 0,
        isWinner: false,
        isRowActive: true
      });

      expect(letterStatus).toBe('Exact');
    });

    it("should return 'Won' if the guessed letter is in the correct possition and the game is won", () => {
      const letterStatus = getLetterStatus({
        letterGuessed: 't',
        correctWord,
        correctLetterIdx: 0,
        isWinner: true,
        isRowActive: true
      });

      expect(letterStatus).toBe('Won');
    });

    it("should return 'Exist' if the guessed letter is in the word, but not in the correct possition", () => {
      const letterStatus = getLetterStatus({
        letterGuessed: 'e',
        correctWord,
        correctLetterIdx: 0,
        isWinner: false,
        isRowActive: true
      });

      expect(letterStatus).toBe('Exist');
    });

    it("should return 'NotExists' if the guessed letter is not in the word", () => {
      const letterStatus = getLetterStatus({
        letterGuessed: 'z',
        correctWord,
        correctLetterIdx: 0,
        isWinner: false,
        isRowActive: true
      });

      expect(letterStatus).toBe('NotExists');
    });
  });

  describe('generateLetterBlocks', () => {
    const letters = ['a', 'b', 'c', 'd', 'e'];

    const LetterComponent = (props: any) => (
      <div {...props} />
    );

    const correctWord = 'abcde';

    it('should return an array with LetterComponents with the correct props when hasAlreadyBeenFilled is true', () => {
      const wordColumns = generateLetterBlocks({
        LetterComponent,
        letters,
        correctWord,
        isWinner: false,
        isRowActive: true,
        hasAlreadyBeenFilled: true
      });

      expect(wordColumns).toHaveLength(5);

      wordColumns.forEach((column, idx) => {
        const expectedLetter = letters[idx] || ' ';
        const expectedStatus = 'Exact';
        const expectedDelay = idx;

        expect(column.props.letter).toBe(expectedLetter);
        expect(column.props.status).toBe(expectedStatus);
        expect(column.props.delay).toBe(expectedDelay);
      });
    });

    it('should return an array with the correct props when hasAlreadyBeenFilled is false', () => {
      const wordColumns = generateLetterBlocks({
        LetterComponent,
        letters,
        correctWord,
        isWinner: false,
        isRowActive: true,
        hasAlreadyBeenFilled: false
      });

      expect(wordColumns).toHaveLength(5);

      wordColumns.forEach((column, idx) => {
        const expectedLetter = letters[idx] || ' ';

        expect(column.props.letter).toBe(expectedLetter);
        expect(column.props.status).toBeUndefined();
        expect(column.props.delay).toBeUndefined();
      });
    });
  });
});

import { getRandomWord, checkIfExists } from '.';

describe('wordBank', () => {
  describe('getRandomWord', () => {
    it('should get a random word', () => {
      const word = getRandomWord();
      expect(word).toBeDefined();
      expect(word.length).toBe(5);
    });
  });

  describe('checkIfExists', () => {
    it("should return false if the word doesn't exist", () => {
      const wordExists = checkIfExists('aaaaa');
      expect(wordExists).toBe(false);
    });

    it('should return true if the word exists', () => {
      const wordExists = checkIfExists('genro');
      expect(wordExists).toBe(true);
    });
  });
});

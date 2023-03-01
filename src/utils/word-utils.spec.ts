import { getRandomWord, checkIfExists } from './word-utils';

describe('word-utils', () => {
  it('should get a random word', () => {
    const word = getRandomWord();
    expect(word).toBeDefined();
    expect(word.length).toBe(5);
  });

  it("should return false if the word doesn't exist", () => {
    const wordExists = checkIfExists('aaaaa');
    expect(wordExists).toBe(false);
  });

  it('should true if the word exists', () => {
    const wordExists = checkIfExists('genro');
    expect(wordExists).toBe(true);
  });
});

import { getRandomWord } from './word-utils';

describe('word-utils', () => {
  it('should get a random word', () => {
    const word = getRandomWord();
    expect(word).toBeDefined();
    expect(word.length).toBe(5);
  });
});

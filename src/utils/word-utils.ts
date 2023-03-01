import wordBank from '../data/word-bank.json';

const getRandomIndex = () => {
  return Math.floor(Math.random() * wordBank.length);
};

export const getRandomWord = () => {
  const randomIndex = getRandomIndex();
  return wordBank[randomIndex];
};

export const checkIfExists = (word: string) => {
  return wordBank.includes(word);
};

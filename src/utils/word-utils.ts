import wordBank from '../word-bank.json';

const getRandomIndex = () => {
  return Math.floor(Math.random() * wordBank.length);
};

export const getRandomWord = () => {
  const randomIndex = getRandomIndex();
  return wordBank[randomIndex];
};

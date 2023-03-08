import { WordRow } from './components/WordRow';
import { useGame } from './context/Game';
import { useHandleKeyUp } from './hooks';

export const AppHeader = () => (
  <header className="w-1/2 mx-auto p-1">
    <h1 className="text-2xl text-center font-semibold">SueTermo</h1>
  </header>
);

export const AppFooter = () => {
  const { isLoser, isWinner } = useGame();

  return (
    <footer>
      {isWinner && <p>Acertou vagabundo!</p>}
      {isLoser && <p>Perdeu otário!</p>}
    </footer>
  );
};
const App = () => {
  const { words, isLoser, isWinner } = useGame();

  useHandleKeyUp({ isWinner, isLoser });

  return (
    <div className="h-screen bg-palette-background text-palette-textColor">
      <AppHeader />

      <main className="flex flex-col p-1 mx-auto sm:px-0 sm:gap-1">
        <div className="flex flex-col">
          {words.map((letters, idx) => (
            <WordRow
              rowNumber={idx}
              lettersProp={letters}
              key={idx}
            />
          ))}
        </div>

        <div className=""></div>
      </main>

      <AppFooter />
    </div>
  );
};

export default App;

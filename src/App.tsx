import { WordRow } from './components/WordRow';
import {
  GameContextProvider,
  useGame
} from './context/Game';
import { useCommands } from './hooks/useCommands';
import { useHandleKeyUp } from './hooks/useHandleKeyUp';

const AppHeader = () => (
  <header className="border-b-2 border-black pb-2 mb-3">
    <h1 className="text-4xl text-center font-bold">
      SueTermo
    </h1>
  </header>
);

const AppFooter = () => {
  const { isLoser, isWinner } = useGame();

  return (
    <footer>
      {isWinner && <p>Acertou vagabundo!</p>}
      {isLoser && <p>Perdeu otário!</p>}
    </footer>
  );
};
const App = () => {
  const { words } = useGame();

  const { handleBackspace, handleEnter } = useCommands();

  useHandleKeyUp({ handleEnter, handleBackspace });

  return (
    <div className="w-full h-screen bg-palette-background text-palette-textColor">
      <div className="w-96 mx-auto pt-2">
        <AppHeader />

        <main className="flex flex-col gap-3">
          {words.map((letters, idx) => (
            <WordRow
              rowNumber={idx}
              lettersProp={letters}
              key={idx}
            />
          ))}
        </main>

        <AppFooter />
      </div>
    </div>
  );
};

export default () => (
  <GameContextProvider>
    <App />
  </GameContextProvider>
);

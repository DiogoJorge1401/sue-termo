import ReactDOM from 'react-dom/client';
import App from './App';
import { GameContextProvider } from './context/Game';
import './index.css';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <GameContextProvider>
    <App />
  </GameContextProvider>
);

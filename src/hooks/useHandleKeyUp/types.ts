export interface UseHandleKeyUpProps {
  isWinner: boolean;
  isLoser: boolean;
}

export type Handlers = {
  Enter: () => void;
  Backspace: () => void;
};

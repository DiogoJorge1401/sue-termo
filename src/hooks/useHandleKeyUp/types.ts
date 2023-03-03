import { EnterProps } from '../useCommands/types';

export interface UseHandleKeyUpProps {
  handleBackspace(): void;
  handleEnter(p: EnterProps): void;
}

export type Handlers = {
  Enter: () => void;
  Backspace: () => void;
};

import { render, screen } from '@testing-library/react';
import { WordRow } from '.';
import { GameContext, initialState } from '../../context/Game';

describe('WordRow', () => {
  it('should renders with correct classes when the row is active', () => {
    const state = { ...initialState };
    const word = 'teste';

    const { container, getAllByText } = render(
      <GameContext.Provider value={state}>
        <WordRow
          rowNumber={0}
          lettersProp={{ hasAlreadyBeenFilled: true, word }}
        />
      </GameContext.Provider>
    );

    let foundText = '';

    getAllByText((text) => {
      if (word.includes(text)) {
        foundText += text;
        return true;
      }
      return false;
    });

    const rowElement = container.querySelector('div');

    expect(foundText).toBe('teste');
    expect(rowElement).toHaveClass('shadow-md rounded');
  });
  it('should renders with no classes when the row is not active', () => {
    const state = { ...initialState };
    const word = 'teste';

    const { container, getAllByText } = render(
      <GameContext.Provider value={state}>
        <WordRow
          rowNumber={1}
          lettersProp={{ hasAlreadyBeenFilled: true, word }}
        />
      </GameContext.Provider>
    );

    let foundText = '';

    getAllByText((text) => {
      if (word.includes(text)) {
        foundText += text;
        return true;
      }
      return false;
    });

    const rowElement = container.querySelector('div');

    expect(foundText).toBe('teste');
    expect(rowElement).not.toHaveClass('shadow-md rounded');
  });
});

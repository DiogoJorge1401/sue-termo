jest.mock('../useCommands');
import { useCommands } from '../useCommands';
import { act, renderHook } from '@testing-library/react';
import { useHandleKeyUp } from '.';

describe('useHandleKeyUp', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let handleEnterSpy: jest.Mock;
  let handleBackspaceSpy: jest.Mock;
  let handleLetterSpy: jest.Mock;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(
      window,
      'removeEventListener'
    );
    handleEnterSpy = jest.fn();
    handleBackspaceSpy = jest.fn();
    handleLetterSpy = jest.fn();

    (useCommands as jest.Mock).mockImplementation(() => ({
      handleEnter: handleEnterSpy,
      handleBackspace: handleBackspaceSpy,
      handleLetter: handleLetterSpy
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should adds keyup event listener to window when neither winner nor loser', () => {
    renderHook(() =>
      useHandleKeyUp({
        isWinner: false,
        isLoser: false
      })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should removes keyup event listener to window when winner', () => {
    renderHook(() =>
      useHandleKeyUp({
        isWinner: true,
        isLoser: false
      })
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should removes keyup event listener to window when loser', () => {
    renderHook(() =>
      useHandleKeyUp({
        isWinner: false,
        isLoser: true
      })
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should call handleEnter when Enter key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({ isLoser: false, isWinner: false })
    );

    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    act(() => window.dispatchEvent(event));

    expect(handleEnterSpy).toHaveBeenCalled();
    expect(handleBackspaceSpy).not.toHaveBeenCalled();
    expect(handleLetterSpy).not.toHaveBeenCalled();
  });

  it('should call handleBackspace when Backspace key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({ isLoser: false, isWinner: false })
    );

    const event = new KeyboardEvent('keyup', { key: 'Backspace' });

    act(() => window.dispatchEvent(event));

    expect(handleBackspaceSpy).toHaveBeenCalled();
    expect(handleEnterSpy).not.toHaveBeenCalled();
    expect(handleLetterSpy).not.toHaveBeenCalled();
  });

  it('should call handleLetter when a letter key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({ isLoser: false, isWinner: false })
    );

    const event = new KeyboardEvent('keyup', { key: 'a' });

    act(() => window.dispatchEvent(event));

    expect(handleLetterSpy).toHaveBeenCalled();
    expect(handleBackspaceSpy).not.toHaveBeenCalled();
    expect(handleEnterSpy).not.toHaveBeenCalled();
  });

  it('should call handleLetter when a letter key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({ isLoser: false, isWinner: false })
    );

    const event = new KeyboardEvent('keyup', { key: 'a' });

    act(() => window.dispatchEvent(event));

    expect(handleLetterSpy).toHaveBeenCalled();
    expect(handleBackspaceSpy).not.toHaveBeenCalled();
    expect(handleEnterSpy).not.toHaveBeenCalled();
  });

  it('should call handleLetter with a lowecase letter when a uppercase letter key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({ isLoser: false, isWinner: false })
    );

    const event = new KeyboardEvent('keyup', { key: 'A' });

    act(() => window.dispatchEvent(event));

    expect(handleLetterSpy).toHaveBeenCalledWith('a');
    expect(handleBackspaceSpy).not.toHaveBeenCalled();
    expect(handleEnterSpy).not.toHaveBeenCalled();
  });

  it('should not call any command when a non-letter key is pressed', () => {
    renderHook(() =>
      useHandleKeyUp({
        isLoser: false,
        isWinner: false
      })
    );

    const event1 = new KeyboardEvent('keyup', { key: 'Escape' });
    const event2 = new KeyboardEvent('keyup', { key: '1' });

    act(() => window.dispatchEvent(event1));
    act(() => window.dispatchEvent(event2));

    expect(handleLetterSpy).not.toHaveBeenCalled();
    expect(handleBackspaceSpy).not.toHaveBeenCalled();
    expect(handleEnterSpy).not.toHaveBeenCalled();
  });
  it('should remove keyup event listener from window when unmounted', () => {
    const { unmount } = renderHook(() =>
      useHandleKeyUp({
        isLoser: false,
        isWinner: false
      })
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keyup',
      expect.any(Function)
    );
  });
});

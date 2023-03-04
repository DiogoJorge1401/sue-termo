import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ANIMATION_DELAY, LetterBlock } from '.';

describe('LetterBlock', () => {
  it('should renders LetterBlock with no status and default delay', () => {
    const letter = 'a';

    const { getByText } = render(<LetterBlock letter={letter} />);

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();
    expect(letterBlock).toHaveClass('bg-palette-letter');
  });

  it('should renders LetterBlock correctly even if status is wrong', async () => {
    const letter = 'a';

    const { getByText } = render(
      <LetterBlock letter={letter} status={'wrongStatus' as any} />
    );

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();
    await waitFor(() =>
      expect(letterBlock).toHaveClass('bg-palette-letter')
    );
  });

  it("should renders with 'Won' status", async () => {
    const letter = 'a';

    const { getByText } = render(
      <LetterBlock letter={letter} status="Won" />
    );

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();

    await waitFor(() =>
      expect(letterBlock).toHaveClass('bg-palette-Won')
    );
  });

  it("should renders with 'Exact' status", async () => {
    const letter = 'a';

    const { getByText } = render(
      <LetterBlock letter={letter} status="Exact" />
    );

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();

    await waitFor(() =>
      expect(letterBlock).toHaveClass('bg-palette-Exact')
    );
  });

  it("should renders with 'Exist' status", async () => {
    const letter = 'a';

    const { getByText } = render(
      <LetterBlock letter={letter} status="Exist" />
    );

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();

    await waitFor(() =>
      expect(letterBlock).toHaveClass('bg-palette-Exist')
    );
  });

  it("should renders with 'NotExists' status", async () => {
    const letter = 'a';

    const { getByText } = render(
      <LetterBlock letter={letter} status="NotExists" />
    );

    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();

    await waitFor(() =>
      expect(letterBlock).toHaveClass('bg-palette-NotExists')
    );
  });

  it('should renders with delay', async () => {
    const letter = 'A';
    const delay = 1;

    const { getByText } = render(
      <LetterBlock letter={letter} status="Won" delay={delay} />
    );
    const letterBlock = getByText(letter);

    expect(letterBlock).toBeInTheDocument();
    expect(letterBlock).not.toHaveClass('bg-palette-Won');

    await act(
      () =>
        new Promise((resolve) =>
          setTimeout(resolve, delay * ANIMATION_DELAY)
        )
    );

    expect(letterBlock).toHaveClass('bg-palette-Won');
  });
});

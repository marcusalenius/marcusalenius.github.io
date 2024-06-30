import { useRef, useState } from "react";

type Props = {
  numLines: number;
  isShowingAll: boolean;
  children: React.ReactNode;
};

function ReadMore({ numLines, isShowingAll, children }: Props) {
  const text = children as string;
  const words = text.split(" ");

  const [lastSpanIndex, setLastSpanIndex] = useState(-1); // -1 means unset

  const containerRef = useRef<HTMLDivElement>(null);

  // Function to get the index of the last span that should be displayed
  //    -1 means error and lastSpanIndex should not be updated
  const getLastSpanIndex = () => {
    if (!containerRef.current) {
      return -1;
    }
    const spans = Array.from(containerRef.current!.querySelectorAll("span"));
    if (spans.length < 1) {
      return -1;
    }
    let seenNumLines = 0;
    let lastTop = spans[0].getBoundingClientRect().top;
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const top = span.getBoundingClientRect().top;
      if (top > lastTop) {
        seenNumLines++;
        if (seenNumLines === numLines + 1) {
          return i - 1;
        }
      }
      lastTop = top;
    }
    return -1;
  };

  if (lastSpanIndex === -1) {
    const newLastSpanIndex = getLastSpanIndex();
    if (newLastSpanIndex !== -1) {
      setLastSpanIndex(newLastSpanIndex);
    }
  }

  const limitedWords =
    lastSpanIndex === -1 ? words : words.slice(0, lastSpanIndex + 1);

  const displayedWords = isShowingAll ? words : limitedWords;

  return (
    <span ref={containerRef}>
      {displayedWords.map((word) => {
        return (
          <>
            <span>{word}</span>
            <> </>
          </>
        );
      })}
    </span>
  );
}

export default ReadMore;

import { useRef, useState } from "react";

type Props = {
  numLines: number;
  children: React.ReactNode;
};

function ReadMore({ numLines, children }: Props) {
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

  return (
    <span ref={containerRef}>
      {words.map((word, index) => {
        return lastSpanIndex == -1 || index <= lastSpanIndex ? (
          <>
            <span>{word}</span>
            <> </>
          </>
        ) : null;
      })}
    </span>
  );
}

export default ReadMore;

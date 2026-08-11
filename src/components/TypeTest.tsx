"use client";

import { ReactNode } from "react";
import { useRef, useState, useEffect, forwardRef } from "react";

type TypeTestProps = {
  finishedText: string;
  correctText: string;
  incorrectText: string;
  restText: string;
  handleNewLine: () => void;
};

type LetterProps = {
  children: ReactNode;
  current?: boolean;
  incorrect?: boolean;
};

const Letter = forwardRef<HTMLSpanElement, LetterProps>(function Letter(
  { children, current, incorrect },
  ref
) {
  return (
    <span
      ref={ref}
      className={`border-l-2 ${
        current
          ? "border-black animate-cursor dark:animate-cursor-dark"
          : "border-transparent"
      } ${incorrect ? "bg-red-100 dark:bg-red-950" : ""}`}
    >
      {children}
    </span>
  );
});

const TypeTest = ({
  finishedText,
  correctText,
  incorrectText,
  restText,
  handleNewLine,
}: TypeTestProps) => {
  // Create refs to find when newlines start
  const ref = useRef<HTMLSpanElement>(null);
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    const newYPosition = ref.current?.offsetTop || 0;

    if (
      newYPosition > yPosition && // Went down to next line
      yPosition !== 0 && // Not an initialization
      incorrectText.length === 0 // If incorrect letters are typed, we don't want to newline
    ) {
      handleNewLine();
    }

    setYPosition(newYPosition);
  }, [ref.current?.offsetTop]);

  return (
    <p className="h-[3.75rem] text-lg leading-relaxed tracking-tighter overflow-hidden select-none dark:text-gray-300 min-[500px]:h-[4.5rem] min-[500px]:text-xl md:h-[5rem] md:text-2xl">
      <span>
        {finishedText.split("").map((letter, index) => (
          <Letter key={`${letter}-${index}`}>{letter}</Letter>
        ))}
      </span>
      <span>
        {correctText.split("").map((letter, index) => (
          <Letter key={`${letter}-${finishedText.length + index}`}>
            {letter}
          </Letter>
        ))}
      </span>
      <span className="text-red-600 dark:text-red-400">
        {incorrectText.split("").map((letter, index) => (
          <Letter incorrect key={`${letter}-${index}`}>
            {letter}
          </Letter>
        ))}
      </span>
      <span className="text-gray-500">
        {restText.split("").map((letter, index) => (
          <Letter
            current={index === 0}
            ref={index === 0 ? ref : undefined}
            key={`${letter}-${
              finishedText.length + correctText.length + index
            }`}
          >
            {letter}
          </Letter>
        ))}{" "}
      </span>
    </p>
  );
};

export default TypeTest;

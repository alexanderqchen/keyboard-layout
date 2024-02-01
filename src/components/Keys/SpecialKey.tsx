import { ReactNode } from "react";

export enum TextPosition {
  LEFT,
  RIGHT,
}

type SpecialKeyProps = {
  text: string;
  Icon?: () => JSX.Element;
  position?: TextPosition;
  highlight?: boolean;
  hint?: boolean;
  width?: string;
};

const SpecialKey = ({
  text,
  Icon,
  position,
  highlight,
  hint,
  width,
}: SpecialKeyProps) => {
  return (
    <div
      className={`shrink-0 grow-0 rounded-md p-2 h-16 ${
        width ? width : "w-16"
      } ${
        highlight
          ? "bg-slate-600 dark:bg-gray-600 text-white dark:text-black border-0"
          : hint
          ? "bg-yellow-500 dark:bg-yellow-600 dark:text-black dark:border-0"
          : "border-2 border-black dark:border-gray-600"
      }`}
    >
      <div
        className={`h-1/2 flex items-start text-[0.8rem]  ${
          position === TextPosition.RIGHT ? "" : "justify-end"
        }`}
      >
        {Icon ? <Icon /> : ""}
      </div>
      <div
        className={`h-1/2 flex items-end text-[0.8rem]  ${
          position === TextPosition.RIGHT ? "justify-end" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default SpecialKey;

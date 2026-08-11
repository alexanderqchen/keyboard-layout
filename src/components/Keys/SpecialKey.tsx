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
  size?: "wide" | "extraWide" | "shift" | "command" | "space";
};

const SpecialKey = ({
  text,
  Icon,
  position,
  highlight,
  hint,
  size,
}: SpecialKeyProps) => {
  return (
    <div
      className={`keyboard-special-key keyboard-special-key--${
        size || "standard"
      } ${Icon ? "keyboard-special-key--has-icon" : ""} shrink-0 grow-0 ${
        highlight
          ? "bg-slate-600 dark:bg-gray-500 text-white dark:text-black border-0"
          : hint
          ? "bg-yellow-500 dark:bg-yellow-600 dark:text-black dark:border-0"
          : "border-2 border-black dark:border-gray-500"
      }`}
    >
      <div
        className={`keyboard-special-key-icon h-1/2 flex items-start ${
          position === TextPosition.RIGHT ? "" : "justify-end"
        }`}
      >
        {Icon ? <Icon /> : ""}
      </div>
      <div
        className={`keyboard-special-key-label h-1/2 flex items-end ${
          position === TextPosition.RIGHT ? "justify-end" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default SpecialKey;

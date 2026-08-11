type SplitKeyProps = {
  BottomIcon?: () => JSX.Element;
  TopIcon?: () => JSX.Element;
  highlightBottom?: boolean;
  highlightTop?: boolean;
};

const SplitKey = ({
  BottomIcon,
  TopIcon,
  highlightBottom,
  highlightTop,
}: SplitKeyProps) => {
  return (
    <div className="keyboard-split-key shrink-0 grow-0">
      <div
        className={`h-1/2 flex items-center justify-center border-black dark:border-gray-500 ${
          highlightTop
            ? "bg-slate-600 dark:bg-gray-500 text-white dark:text-black"
            : "border-2"
        } ${!TopIcon ? "invisible" : ""} ${
          TopIcon && BottomIcon ? "rounded-t-md border-b-[1px]" : "rounded-md"
        }`}
      >
        {TopIcon && <TopIcon />}
      </div>
      <div
        className={`h-1/2 flex items-center justify-center border-black dark:border-gray-500 ${
          highlightBottom
            ? "bg-slate-600 dark:bg-gray-500 text-white dark:text-black"
            : "border-2"
        } ${!BottomIcon ? "invisible" : ""} ${
          TopIcon && BottomIcon ? "rounded-b-md border-t-[1px]" : "rounded-md"
        }`}
      >
        {BottomIcon && <BottomIcon />}
      </div>
    </div>
  );
};

export default SplitKey;

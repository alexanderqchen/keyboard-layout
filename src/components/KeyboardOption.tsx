type KeyboardOptionProps = {
  name: string;
  description: string;
  highlight: boolean;
  onClick: () => void;
};

const KeyboardOption = ({
  name,
  description,
  highlight,
  onClick,
}: KeyboardOptionProps) => {
  return (
    <button
      type="button"
      aria-pressed={highlight}
      className={`text-left min-w-0 max-w-64 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 cursor-pointer transition flex-1 ${
        highlight
          ? "border-black dark:border-gray-400 text-black dark:text-gray-300"
          : "border-gray-400 dark:border-gray-500 text-gray-500 hover:shadow-lg ease-in-out duration-300"
      }`}
      onClick={onClick}
    >
      <span className="block text-sm min-[420px]:text-base sm:text-lg font-medium sm:mb-2">
        {name}
      </span>
      <span className="hidden text-sm sm:block">{description}</span>
    </button>
  );
};

export default KeyboardOption;

import Link from "next/link";

type KeyboardOptionProps = {
  name: string;
  description: string;
  highlight: boolean;
  href: string;
  onSelect: () => void;
};

const KeyboardOption = ({
  name,
  description,
  highlight,
  href,
  onSelect,
}: KeyboardOptionProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={highlight ? "page" : undefined}
      className={`text-left min-w-0 max-w-64 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 cursor-pointer transition flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 ${
        highlight
          ? "border-black dark:border-gray-400 text-black dark:text-gray-300"
          : "border-gray-400 dark:border-gray-500 text-gray-500 hover:shadow-lg ease-in-out duration-300"
      }`}
      onClick={(event) => {
        // Modified clicks keep normal link behavior (new tab/window).
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (highlight) event.preventDefault();
        onSelect();
      }}
    >
      <span className="block text-sm min-[420px]:text-base sm:text-lg font-medium sm:mb-2">
        {name}
      </span>
      <span className="hidden text-sm sm:block">{description}</span>
    </Link>
  );
};

export default KeyboardOption;

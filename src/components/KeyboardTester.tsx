"use client";

import { useState, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import Keyboard from "@/components/Keyboard";
import KeyboardOption from "@/components/KeyboardOption";
import KeyboardRecommendations from "@/components/KeyboardRecommendations";
import TypeTest from "@/components/TypeTest";
import qwertyKeyMap from "@/keyboards/qwertyKeyMap";
import dvorakKeyMap from "@/keyboards/dvorakKeyMap";
import colemakKeyMap from "@/keyboards/colemakKeyMap";
import { words } from "@/words";
import LightBulb from "@/components/Icons/LightBulb";
import { track } from "@/lib/analytics";
import { layouts, layoutForPathname, type LayoutName } from "@/lib/layouts";
import { createPracticeTracker, isPracticeInput } from "@/lib/practice-analytics";

const MobileBanner = dynamic(() => import("@/components/MobileBanner"), {
  ssr: false,
});

const KeyMap = {
  qwerty: qwertyKeyMap,
  dvorak: dvorakKeyMap,
  colemak: colemakKeyMap,
};

const KeyboardTester = ({ children }: { children: ReactNode }) => {
  const appRef = useRef<HTMLDivElement>(null);

  // The shared route layout keeps typing state and hints mounted during navigation.
  const keyboardLayout = layoutForPathname(usePathname());
  const selectedLayout = layouts[keyboardLayout];
  const keyMap = KeyMap[keyboardLayout] as any;
  const previousLayout = useRef(keyboardLayout);
  const practice = useRef<ReturnType<typeof createPracticeTracker> | null>(null);
  if (!practice.current) {
    practice.current = createPracticeTracker(keyboardLayout, track, () => crypto.randomUUID());
  }

  useEffect(() => {
    if (previousLayout.current !== keyboardLayout) {
      track("layout_selected", { layout: keyboardLayout, previous_layout: previousLayout.current });
      practice.current?.selectLayout(keyboardLayout);
      previousLayout.current = keyboardLayout;
    }
    appRef.current?.focus({ preventScroll: true });
  }, [keyboardLayout]);

  // Keys that are currently pressed down. For visual keyboard
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  const [shiftLeft, setShiftLeft] = useState(false);
  const [shiftRight, setShiftRight] = useState(false);
  const shift = shiftLeft || shiftRight;

  const [metaLeft, setMetaLeft] = useState(false);
  const [metaRight, setMetaRight] = useState(false);
  const meta = metaLeft || metaRight;

  const resetKeys = () => {
    setPressedKeys(new Set());
    setShiftLeft(false);
    setShiftRight(false);
    setMetaLeft(false);
    setMetaRight(false);
  };

  // Store if should show hints
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    appRef.current?.focus();
    const pause = () => practice.current?.pause();
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", pause);
    return () => {
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);

  const getHintKey = () => {
    if (!showHints) {
      return undefined;
    }

    if (incorrectText.length > 0) {
      return "Backspace";
    }

    return Object.keys(keyMap).find(
      (key) =>
        keyMap[key].value === restText[0] ||
        keyMap[key].shiftValue === restText[0]
    );
  };

  // Store type test data
  const [typeTestState, setTypeTestState] = useState({
    finishedText: "", // Complete words that have been finished
    typedText: "", // The text currently being typed
    unfinishedText: "", // All text that is incomplete (including typedText)
  });
  const { correctText, incorrectText, restText } = useMemo(() => {
    const { typedText, unfinishedText } = typeTestState;

    // Find the index of the first incorrect character in typedText
    let incorrectIndex = 0;
    while (
      incorrectIndex < typedText.length &&
      incorrectIndex < unfinishedText.length &&
      typedText[incorrectIndex] === unfinishedText[incorrectIndex]
    ) {
      incorrectIndex++;
    }

    // Handle logic to display typed text correctly
    const correctText = typedText.slice(0, incorrectIndex);
    const incorrectText = typedText
      .slice(incorrectIndex)
      .replace(/ /g, "\u00A0");
    const restText = unfinishedText.slice(incorrectIndex);

    return { correctText, incorrectText, restText };
  }, [typeTestState]);

  useEffect(() => {
    // Set type test to a set of random words
    setTypeTestState({
      finishedText: "",
      typedText: "",
      unfinishedText: [...words].sort(() => 0.5 - Math.random()).join(" "),
    });
  }, []);

  useEffect(() => {
    // Add more words to type if its running low
    const { unfinishedText } = typeTestState;

    if (unfinishedText !== "" && unfinishedText.length < 500) {
      setTypeTestState((prev) => ({
        ...prev,
        unfinishedText:
          prev.unfinishedText +
          " " +
          [...words].sort(() => 0.5 - Math.random()).join(" "),
      }));
    }
  }, [typeTestState]);

  const handleTypeTestKeyDown = (code: string) => {
    if (code === "Backspace" && meta) {
      // Special feature, remove all incorrect text on cmd + backspace
      setTypeTestState((prev) => {
        // Find the index of the first incorrect character in typedText
        let incorrectIndex = 0;
        while (
          incorrectIndex < prev.typedText.length &&
          incorrectIndex < prev.unfinishedText.length &&
          prev.typedText[incorrectIndex] === prev.unfinishedText[incorrectIndex]
        ) {
          incorrectIndex++;
        }

        return {
          ...prev,
          typedText: prev.typedText.slice(0, incorrectIndex),
        };
      });

      // When you cmd+key, the key stays down
      // this is to artificially KeyUp the Backspace button
      setPressedKeys((prev) => {
        prev.delete("Backspace");
        return new Set(prev);
      });
    } else if (code === "Backspace") {
      // Remove 1 from typedText if applicable
      setTypeTestState((prev) => {
        if (prev.typedText.length === 0) {
          return {
            ...prev,
          };
        }

        return {
          ...prev,
          typedText: prev.typedText.slice(0, prev.typedText.length - 1),
        };
      });
    } else if (code === "Space") {
      setTypeTestState((prev) => {
        const nextUnfinishedWord = prev.unfinishedText.slice(
          0,
          prev.unfinishedText.indexOf(" ")
        );

        if (prev.typedText === nextUnfinishedWord) {
          // Handle when a word is typed correctly by:
          // 1. Remove word from unfinishedText
          // 2. Add word to finishedText
          // 3. Reset typedText
          return {
            finishedText: prev.finishedText + nextUnfinishedWord + " ",
            typedText: "",
            unfinishedText: prev.unfinishedText.slice(
              prev.unfinishedText.indexOf(" ") + 1
            ),
          };
        } else {
          // If word is typed incorrectly, just add as usual
          return {
            ...prev,
            typedText: prev.typedText + " ",
          };
        }
      });
    } else {
      if (meta || !keyMap[code]) {
        // If performing a command, ignore the typed letter
        return;
      }

      // Handle normal case when letter is typed
      const typedLetter =
        (shift ? keyMap[code].shiftValue : keyMap[code].value) || "";

      setTypeTestState((prev) => ({
        ...prev,
        typedText: prev.typedText + typedLetter,
      }));
    }
  };

  // Handle new line
  const handleNewLine = () => {
    setTypeTestState((prev) => {
      return {
        ...prev,
        finishedText: "",
      };
    });
  };

  // KeyboardEvent Handlers
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) {
      return;
    }
    // The recommendations make the page scrollable; spaces belong to the test.
    if (event.code === "Space" || event.code === "Backspace") {
      event.preventDefault();
    }
    if (event.code === "ShiftLeft") {
      setShiftLeft(true);
    }
    if (event.code === "ShiftRight") {
      setShiftRight(true);
    }
    if (event.code === "MetaLeft") {
      setMetaLeft(true);
    }
    if (event.code === "MetaRight") {
      setMetaRight(true);
    }

    // Set highlighted key on visual keyboard
    setPressedKeys((prev) => new Set(prev.add(event.code)));

    if (isPracticeInput({
      repeat: event.repeat,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      isComposing: event.nativeEvent.isComposing,
      code: event.code,
      mappedValue: keyMap[event.code]?.value,
    })) {
      practice.current?.input(performance.now());
    }
    handleTypeTestKeyDown(event.code);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.code === "ShiftLeft") {
      setShiftLeft(false);
    }
    if (event.code === "ShiftRight") {
      setShiftRight(false);
    }
    if (event.code === "MetaLeft") {
      setMetaLeft(false);
    }
    if (event.code === "MetaRight") {
      setMetaRight(false);
    }

    // Unset highlighted key on visual keyboard
    setPressedKeys((prev) => {
      prev.delete(event.code);
      return new Set(prev);
    });
  };

  return (
    <div>
      <MobileBanner />
      <main className="w-full min-h-screen max-w-6xl mx-auto px-4 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8 md:px-12 md:pt-10 md:pb-12 flex flex-col">
        <header className="mb-5 sm:mb-6">
          <h1 className="text-base font-medium tracking-tight text-gray-900 sm:text-lg dark:text-gray-200">
            {selectedLayout.heading}
          </h1>
          <p id="typing-instructions" className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm dark:text-gray-400">
            {selectedLayout.introduction}
          </p>
        </header>
        <div
          ref={appRef}
          className="outline-none flex flex-col"
          aria-label="Keyboard layout typing tester"
          aria-describedby="typing-instructions"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={() => { resetKeys(); practice.current?.pause(); }}
        >
          <div className="mb-4 flex items-start gap-3 sm:gap-6 md:gap-8">
            <nav aria-label="Keyboard layouts" className="flex min-w-0 flex-1 gap-2 mb-4 sm:gap-4">
              {(Object.keys(layouts) as LayoutName[]).map((name) => (
                <KeyboardOption
                  key={name}
                  name={layouts[name].name}
                  description={layouts[name].summary}
                  href={layouts[name].path}
                  highlight={keyboardLayout === name}
                  onSelect={() => appRef.current?.focus({ preventScroll: true })}
                />
              ))}
            </nav>
            <div className="text-right shrink-0">
              <button
                type="button"
                className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
                onClick={() => {
                  const enabled = !showHints;
                  setShowHints(enabled);
                  track("hints_toggled", { layout: keyboardLayout, enabled });
                  appRef.current?.focus();
                }}
                onKeyUp={(e) => e.preventDefault()}
                aria-label={showHints ? "Hide key hints" : "Show key hints"}
                aria-pressed={showHints}
              >
                <LightBulb lit={showHints} />
              </button>
            </div>
          </div>

          <div className="mb-4 ph-no-capture" data-private-typing>
            <TypeTest
              finishedText={typeTestState.finishedText}
              correctText={correctText}
              incorrectText={incorrectText}
              restText={restText}
              handleNewLine={handleNewLine}
            />
          </div>
          <div className="keyboard-frame w-full flex justify-center mb-8 sm:mb-10 md:mb-12 ph-no-capture" data-private-typing>
            <Keyboard
              pressedKeys={pressedKeys}
              keyMap={keyMap}
              hintKey={getHintKey()}
            />
          </div>
        </div>

        <KeyboardRecommendations layout={keyboardLayout} />

        {children}

        <div className="mt-8 text-sm sm:text-base text-gray-400 dark:text-gray-600 text-right grow flex flex-col justify-end">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Link href="/learn" className="underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-400">Guides</Link>
            <p>
              A product by{" "}
              <a
                href="https://experimental.software/"
                target="_blank"
                className="underline"
              >
                Experimental Software
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KeyboardTester;

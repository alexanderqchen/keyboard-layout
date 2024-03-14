"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Keyboard from "@/components/Keyboard";
import KeyboardOption from "@/components/KeyboardOption";
import TypeTest from "@/components/TypeTest";
import qwertyKeyMap from "@/keyboards/qwertyKeyMap";
import dvorakKeyMap from "@/keyboards/dvorakKeyMap";
import colemakKeyMap from "@/keyboards/colemakKeyMap";
import { words } from "@/words";
import LightBulb from "@/components/Icons/LightBulb";

const MobileBanner = dynamic(() => import("@/components/MobileBanner"), {
  ssr: false,
});

enum KeyboardLayout {
  QWERTY,
  DVORAK,
  COLEMAK,
}

const KeyMap = {
  [KeyboardLayout.QWERTY]: qwertyKeyMap,
  [KeyboardLayout.DVORAK]: dvorakKeyMap,
  [KeyboardLayout.COLEMAK]: colemakKeyMap,
};

const App = () => {
  // Keyboard configuration
  const [keyboardLayout, setKeyboardLayout] = useState(KeyboardLayout.QWERTY);
  const keyMap = KeyMap[keyboardLayout] as any;

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
      unfinishedText: words.sort(() => 0.5 - Math.random()).join(" "),
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
          words.sort(() => 0.5 - Math.random()).join(" "),
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
      if (meta) {
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
      <div
        className="p-12 pt-20 w-screen h-screen max-w-6xl m-auto outline-none flex flex-col"
        autoFocus
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={() => resetKeys()}
      >
        <div className="mb-4 flex items-start gap-8">
          <div className="flex gap-4 mb-4 shrink">
            <KeyboardOption
              name="QWERTY"
              description="The standard format. Designed to minimize typewriter jams."
              highlight={keyboardLayout === KeyboardLayout.QWERTY}
              onClick={() => setKeyboardLayout(KeyboardLayout.QWERTY)}
            />
            <KeyboardOption
              name="Dvorak"
              description="Designed for a fast and ergonomic typing experience."
              highlight={keyboardLayout === KeyboardLayout.DVORAK}
              onClick={() => setKeyboardLayout(KeyboardLayout.DVORAK)}
            />
            <KeyboardOption
              name="Colemak"
              description="Resembles QWERTY while being more efficient and comfortable."
              highlight={keyboardLayout === KeyboardLayout.COLEMAK}
              onClick={() => setKeyboardLayout(KeyboardLayout.COLEMAK)}
            />
          </div>
          <div className="text-right shrink-0 grow">
            <button
              tabIndex={-1}
              className="outline-none"
              onClick={() => setShowHints((prev) => !prev)}
              onKeyUp={(e) => e.preventDefault()}
            >
              <LightBulb lit={showHints} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <TypeTest
            finishedText={typeTestState.finishedText}
            correctText={correctText}
            incorrectText={incorrectText}
            restText={restText}
            handleNewLine={handleNewLine}
          />
        </div>
        <div className="w-full flex justify-center mb-12">
          <Keyboard
            pressedKeys={pressedKeys}
            keyMap={keyMap}
            hintKey={getHintKey()}
          />
        </div>

        <div className="text-gray-400 dark:text-gray-600 text-right grow flex flex-col justify-end">
          <p>
            Designed & Built by{" "}
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
    </div>
  );
};

export default App;

// Public routes and copy live together; key mappings remain in keyboards/.
export const layouts = {
  qwerty: {
    name: "QWERTY",
    path: "/",
    summary: "The familiar layout used on most English-language keyboards.",
    heading: "Keyboard Layout Simulator",
    introduction: "Try QWERTY, Dvorak and Colemak. Just start typing.",
    title: "Keyboard Layout Simulator | Dvorak, Colemak, QWERTY",
    description: "Try QWERTY, Dvorak and Colemak online. Practice typing with an on-screen keyboard and optional key hints. No download or system settings to change.",
  },
  dvorak: {
    name: "Dvorak",
    path: "/dvorak",
    summary: "An alternative layout that puts common English letters on the home row.",
    heading: "Dvorak Keyboard Simulator",
    introduction: "Try Dvorak on your keyboard. Just start typing.",
    title: "Dvorak Keyboard Simulator | Keyboard Layout",
    description: "Try the Dvorak keyboard layout online without changing your system settings. Practice typing with a Dvorak keyboard diagram and optional key hints.",
  },
  colemak: {
    name: "Colemak",
    path: "/colemak",
    summary: "An alternative layout that keeps many familiar QWERTY key positions.",
    heading: "Colemak Keyboard Simulator",
    introduction: "Try Colemak on your keyboard. Just start typing.",
    title: "Colemak Keyboard Simulator | Keyboard Layout",
    description: "Try the Colemak keyboard layout online without changing your system settings. Practice typing with a Colemak keyboard diagram and optional key hints.",
  },
} as const;

export type LayoutName = keyof typeof layouts;

export function layoutForPathname(pathname: string): LayoutName {
  if (pathname === "/dvorak") return "dvorak";
  if (pathname === "/colemak") return "colemak";
  return "qwerty";
}

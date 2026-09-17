export const articles = {
  dvorak: {
    path: "/learn/dvorak",
    title: "How to Learn Dvorak: A Beginner’s Guide",
    description: "Learn the Dvorak home row, build a manageable practice routine, and set up Dvorak on Windows, Mac, or Linux. Start with a browser-based trial.",
    category: "Beginner guide",
    summary: "Find your home row, learn the new positions, and make the move from practice to everyday typing.",
  },
  colemak: {
    path: "/learn/colemak",
    title: "How to Learn Colemak: A Beginner’s Guide",
    description: "Learn standard Colemak, understand how it differs from Colemak-DH, and get practical practice and setup advice for Windows, Mac, and Linux.",
    category: "Beginner guide",
    summary: "Build on your QWERTY habits, choose the right variant, and learn Colemak one stage at a time.",
  },
  comparison: {
    path: "/compare/qwerty-dvorak-colemak",
    title: "QWERTY vs. Dvorak vs. Colemak: Which Layout Should You Use?",
    description: "Compare QWERTY, Dvorak, and Colemak by learning effort, shortcuts, everyday compatibility, and the limits of typing-speed and comfort claims.",
    category: "Comparison",
    summary: "Compare the tradeoffs that matter in daily use, from shortcuts and setup to learning effort.",
  },
  history: {
    path: "/learn/history",
    title: "A History of Keyboard Layouts: From QWERTY to Dvorak and Colemak",
    description: "Follow keyboard layouts from early typewriters to QWERTY, Dvorak, international standards, Colemak, and programmable keyboards—with sources and context.",
    category: "History",
    summary: "The inventions, competing ideas, and everyday habits behind the keys we use today.",
  },
} as const;

export type ArticleId = keyof typeof articles;

export const guidesIndex = {
  path: "/learn",
  title: "Keyboard Layout Guides",
  description: "Practical guides to learning Dvorak and Colemak, an honest layout comparison, and a sourced history of keyboard layouts.",
};

import type { ReactNode } from "react";
import KeyboardTester from "@/components/KeyboardTester";

export default function TesterLayout({ children }: { children: ReactNode }) {
  return <KeyboardTester>{children}</KeyboardTester>;
}

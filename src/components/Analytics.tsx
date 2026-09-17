"use client";

import { useEffect } from "react";
import { initializeAnalytics } from "@/lib/analytics";

export default function Analytics() {
  useEffect(() => { initializeAnalytics(); }, []);
  return null;
}

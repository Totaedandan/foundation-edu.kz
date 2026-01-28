"use client";

import { LangProvider } from "@/components/lang";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
}

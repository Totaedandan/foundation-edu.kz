"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { LANGS, normalizeLang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("foundation_lang") : null;
    setLangState(normalizeLang(stored));
  }, []);

  const setLang = (next: Lang) => {
    const safe = LANGS.includes(next) ? next : "ru";
    setLangState(safe);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("foundation_lang", safe);
      document.documentElement.lang = safe;
    }
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";

const LINKS = [
  { id: "for", key: "nav_for" },
  { id: "programs", key: "nav_programs" },
  { id: "results", key: "nav_results" },
  { id: "teachers", key: "nav_teachers" },
  { id: "pricing", key: "nav_pricing" },
  { id: "faq", key: "nav_faq" },
  { id: "contacts", key: "nav_contacts" },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  (document.activeElement as HTMLElement | null)?.blur?.();

  const headerOffset = 88;
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "fixed inset-x-0 top-0 z-50 transition " +
        (scrolled ? "backdrop-blur bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]" : "bg-transparent")
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={() => scrollToId("top")} className="flex items-center gap-2 group">
          <span className="w-[2px] self-stretch rounded-full bg-white/70 group-hover:bg-white/90 transition" />
          <div className="leading-tight text-left">
            {/* ✅ bigger brand */}
            <div className="font-semibold text-[18px] sm:text-[20px] leading-none">
              FOUNDATION.
            </div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-5 text-sm">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className="text-muted hover:text-white transition"
              onClick={() => scrollToId(l.id)}
            >
              {t(lang, l.key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="glass rounded-2xl overflow-hidden flex">
            <button
              className={"px-3 py-2 text-sm transition " + (lang === "ru" ? "bg-white/10" : "text-muted hover:text-white")}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
            <button
              className={"px-3 py-2 text-sm transition " + (lang === "kz" ? "bg-white/10" : "text-muted hover:text-white")}
              onClick={() => setLang("kz")}
            >
              KZ
            </button>
          </div>

          <button
            onClick={() => scrollToId("lead-form")}
            className="hidden sm:inline-flex items-center gap-2 rounded-2xl bg-[#800020] hover:bg-[#6a001b] px-4 py-2 text-sm font-semibold transition shadow-lg shadow-black/20"
          >
            <MessageCircle className="h-4 w-4" />
            {t(lang, "cta_consult")}
          </button>
        </div>
      </div>
    </div>
  );
}

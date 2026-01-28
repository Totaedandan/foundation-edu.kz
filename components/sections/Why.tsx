"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { ShieldCheck, Route, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Route, h: "why_1_h", p: "why_1_p" },
  { icon: ShieldCheck, h: "why_2_h", p: "why_2_p" },
  { icon: Sparkles, h: "why_3_h", p: "why_3_p" },
] as const;

export function Why() {
  const { lang } = useLang();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "why_title")}</div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.h} delay={idx * 0.05}>
              <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-6 h-full">
                <div className="h-11 w-11 rounded-2xl bg-[#800020]/16 border border-[#800020]/25 grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-lg font-semibold">{t(lang, it.h)}</div>
                <div className="mt-2 text-sm text-muted">{t(lang, it.p)}</div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

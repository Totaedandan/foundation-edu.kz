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
    <section className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* мягкий переход секции */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">
          {t(lang, "why_title")}
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {items.map((it, idx) => {
          const Icon = it.icon;

          return (
            <Reveal key={it.h} delay={idx * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass rounded-3xl p-4 sm:p-6 h-full"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#800020]/14 border border-[#800020]/20 grid place-items-center">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">
                  {t(lang, it.h)}
                </div>

                <div className="mt-2 text-sm text-muted line-clamp-3 sm:line-clamp-none">
                  {t(lang, it.p)}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

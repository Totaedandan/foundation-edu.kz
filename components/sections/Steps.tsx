"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";

const steps = [
  { title: "step_1", desc: "step_desc_1" },
  { title: "step_2", desc: "step_desc_2" },
  { title: "step_3", desc: "step_desc_3" },
  { title: "step_4", desc: "step_desc_4" },
  { title: "step_5", desc: "step_desc_5" },
] as const;

export function Steps() {
  const { lang } = useLang();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">
          {t(lang, "steps_title")}
        </div>
      </Reveal>

      {/* Desktop: checkpoint path */}
      <div className="mt-10 hidden lg:block">
        <div className="relative">
          {/* path line (сделал мягче/менее "divider") */}
          <div className="absolute left-0 right-0 top-5 h-px bg-white/5 blur-[0.5px]" />
          <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-transparent via-[#800020]/45 to-transparent blur-[0.5px]" />

          <div className="flex">
            {steps.map((s, idx) => (
              <div key={s.title} className="flex-1">
                <Reveal delay={idx * 0.04} className="flex justify-center">
                  <motion.div whileHover={{ scale: 1.03 }} className="relative">
                    <div className="h-10 w-10 rounded-full bg-[#040B1B] border border-[#800020]/60 shadow-[0_0_0_8px_rgba(128,0,32,0.08)] flex items-center justify-center">
                      <span className="text-sm font-semibold">0{idx + 1}</span>
                    </div>
                    {/* small marker */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#800020]" />
                  </motion.div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 0.04}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass rounded-3xl p-5 h-full"
              >
                <div className="h-1 w-10 rounded-full bg-[#800020]" />
                <div className="mt-3 font-semibold">{t(lang, s.title)}</div>
                <div className="mt-2 text-sm text-muted">{t(lang, s.desc)}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: vertical checkpoint path */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:hidden">
        {steps.map((s, idx) => (
          <Reveal key={s.title} delay={idx * 0.04}>
            <div className="relative pl-12">
              {/* vertical line (сделал мягче/менее заметной) */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-white/5 blur-[0.5px]" />
              )}

              {/* dot */}
              <div className="absolute left-0 top-2">
                <div className="h-10 w-10 rounded-full bg-[#040B1B] border border-[#800020]/60 shadow-[0_0_0_8px_rgba(128,0,32,0.08)] flex items-center justify-center">
                  <span className="text-sm font-semibold">0{idx + 1}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ y: -2 }}
                className="glass rounded-3xl p-4 sm:p-5"
              >
                <div className="h-1 w-10 rounded-full bg-[#800020]" />
                <div className="mt-3 font-semibold">{t(lang, s.title)}</div>

                {/* На мобилке ограничим описание, чтобы меньше скролла */}
                <div className="mt-2 text-sm text-muted line-clamp-3 sm:line-clamp-none">
                  {t(lang, s.desc)}
                </div>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

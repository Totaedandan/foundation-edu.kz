"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { programs } from "@/lib/content";
import {
  BookOpen,
  GraduationCap,
  Telescope,
  Brain,
  FileText,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

const ICONS: Record<string, any> = {
  ielts: BookOpen,
  sat: Target,
  ap: GraduationCap,
  research: Telescope,
  counseling: FileText,
  english: Brain,
};

export function Programs() {
  const { lang } = useLang();

  return (
    <section id="programs" className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* мягкие “переходы” сверху/снизу секции */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">
          {t(lang, "programs_title")}
        </div>
        <div className="text-muted mt-2 max-w-2xl">
          {t(lang, "programs_sub")}
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((p, idx) => {
          const Icon = ICONS[p.id] ?? BookOpen;

          return (
            <Reveal key={p.id} delay={idx * 0.04}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-3xl p-4 sm:p-6 h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-semibold">
                      {p.title}
                    </div>

                    <div className="text-sm text-muted mt-1 line-clamp-2 sm:line-clamp-none">
                      {p.desc}
                    </div>
                  </div>

                  <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-[#800020] shadow-[0_12px_40px_rgba(0,0,0,0.35)] grid place-items-center shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[11px] sm:text-xs text-muted shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                  {p.tag}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

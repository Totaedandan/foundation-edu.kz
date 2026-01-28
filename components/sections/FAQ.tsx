"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { faqs } from "@/lib/content";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* мягкий переход секции */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">
          {t(lang, "faq_title")}
        </div>
      </Reveal>

      <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3">
        {faqs.map((f, idx) => {
          const isOpen = open === idx;

          return (
            <Reveal key={`${idx}-${f.q.ru}`} delay={idx * 0.03}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.995 }}
                onClick={() => setOpen(isOpen ? null : idx)}
                className={
                  "glass rounded-3xl text-left w-full transition " +
                  (isOpen ? "bg-white/[0.055]" : "")
                }
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-semibold text-base sm:text-lg leading-snug pr-2">
                      {f.q[lang]}
                    </div>

                    <ChevronDown
                      className={
                        "h-5 w-5 text-muted transition-transform duration-200 shrink-0 " +
                        (isOpen ? "rotate-180" : "")
                      }
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 text-sm text-muted leading-relaxed">
                          {f.a[lang]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

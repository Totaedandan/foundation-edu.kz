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
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "faq_title")}</div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {faqs.map((f, idx) => {
          const isOpen = open === idx;

          return (
            <Reveal key={`${idx}-${f.q.ru}`} delay={idx * 0.03}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.995 }}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="glass rounded-3xl p-5 text-left w-full"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold">{f.q[lang]}</div>
                  <ChevronDown
                    className={
                      "h-5 w-5 text-muted transition-transform duration-200 " +
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
                      <div className="mt-3 text-sm text-muted">{f.a[lang]}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

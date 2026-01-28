"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { pricing } from "@/lib/content";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function formatKZT(v: number) {
  return v.toLocaleString("ru-RU") + " ₸";
}

export function Pricing() {
  const { lang } = useLang();

  return (
    <section id="pricing" className="relative isolate mx-auto max-w-6xl px-4 py-16 overflow-hidden">
      {/* Keep decorative blobs BEHIND content (avoid washing out rows/cards) */}
      <div className="pointer-events-none absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-[#800020]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#800020]/12 blur-3xl" />

      <div className="relative z-10">
        <Reveal>
          <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "pricing_title")}</div>
          <div className="text-muted mt-2">{t(lang, "pricing_sub")}</div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <Reveal className="lg:col-span-2">
          <div className="glass rounded-3xl p-4">
            <div className="grid grid-cols-2 px-4 py-3 rounded-2xl bg-white/6 text-sm text-muted shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <div>Услуга</div>
              <div className="text-right">Цена / месяц</div>
            </div>

            <div className="mt-3 space-y-2">
              {pricing.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-2 px-4 py-4 rounded-2xl bg-white/[0.045] hover:bg-white/[0.07] transition shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
                >
                  <div className="font-medium">{p.title}</div>
                  <div className="text-right font-semibold">{formatKZT(p.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-1">
          <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-6 sticky top-28">
            <div className="text-lg font-semibold">Что входит</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {[
                "Диагностика и план",
                "Занятия 12 часов/мес",
                "Домашние задания и проверка",
                "Рекомендации по таймлайну поступления",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-300 mt-0.5" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-5 w-full rounded-2xl bg-[#800020] hover:bg-[#6a001b] px-4 py-3 font-semibold transition shadow-lg shadow-black/20"
            >
              {t(lang, "cta_consult")}
            </button>
          </motion.div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { hKey: "stats_1_h", pKey: "stats_1_p" },
  { hKey: "stats_2_h", pKey: "stats_2_p" },
  { hKey: "stats_3_h", pKey: "stats_3_p" },
  { hKey: "stats_4_h", pKey: "stats_4_p" },
] as const;

export function Stats() {
  const { lang } = useLang();

  return (
    <section id="results" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "stats_title")}</div>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, idx) => (
          <Reveal key={s.hKey} delay={idx * 0.04}>
            <motion.div whileHover={{ y: -3 }} className="glass rounded-3xl p-5 h-full">
              <div className="text-3xl font-semibold">{t(lang, s.hKey)}</div>
              <div className="text-sm text-muted mt-1">{t(lang, s.pKey)}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/*
          NOTE: col-span must be applied to the grid item itself.
          Reveal wraps children, so we attach the col-span to Reveal.
        */}
        <Reveal delay={0.05} className="lg:col-span-5">
          <div className="glass rounded-3xl overflow-hidden relative h-full">
            <div className="relative h-56 sm:h-72">
              <Image src="/images/p11_352_10c32be548.jpg" alt="" fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B1B]/80 via-[#040B1B]/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-lg font-semibold">{lang === "kz" ? "Дайындық ортасы" : "Среда подготовки"}</div>
              <div className="text-sm text-muted mt-1">{lang === "kz" ? "Топ, менторинг және тұрақты прогресс-бақылау." : "Группы, менторство и регулярный контроль прогресса."}</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass rounded-3xl overflow-hidden relative h-full">
            <div className="relative h-56 sm:h-72">
              <Image src="/images/p12_369_4a0c68ca41.jpeg" alt="" fill className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B1B]/85 via-[#040B1B]/25 to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-lg font-semibold">{lang === "kz" ? "IELTS/UKVI тесті" : "IELTS/UKVI тест"}</div>
              <div className="text-sm text-muted mt-1">{lang === "kz" ? "Шымкентте ресми түрде тапсыру мүмкіндігі." : "Возможность официально сдавать в Шымкенте."}</div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <span className="inline-flex h-5 w-9 items-center justify-center rounded-md bg-[#800020] text-white font-bold text-[10px]">IELTS</span>
                {lang === "kz" ? "British Council атынан" : "от имени British Council"}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

const TEAM = [
  {
    avatar: "/images/alisher.png",
    name: "Алишер Тлеубаев, PhD",
    role: "Академический директор и SAT эксперт",
    points: [
      "Двукратный обладатель стипендии «Болашак», DAAD и CERGE-EI Fellowship",
      "PhD (Германия), MSc (UK), опыт преподавания и research",
    ],
  },
  {
    avatar: "/images/dinara.png",
    name: "Динара Арыстанбек",
    role: "Эксперт в сфере образования",
    points: ["5+ лет опыта", "Профориентолог, IELTS тренер (BI Education)"],
  },
  {
    avatar: "/images/nurdaulet.png",
    name: "Нурдаулет Елубай, PhD",
    role: "IELTS-эксперт",
    points: ["Статистика (University of Milano-Bicocca)", "Опыт работы в British Council"],
  },
  {
    avatar: "/images/erzhan.png",
    name: "Ержан Сыздыков, PhD",
    role: "Research Instructor",
    points: ["Ex Associate Dean (SDU Business School, 2020–2025)", "Сопровождение научного портфолио"],
  },
  {
    avatar: "/images/yulduz.png",
    name: "Юлдузхан Тургунова",
    role: "IELTS & General English Instructor",
    points: ["Выпускница Nazarbayev University", "5 лет опыта преподавания"],
  },
] as const;

// ✅ Поменяй имена файлов под свои (public/videos/*)
const VIDEOS = [
  { src: "/videos/team-1.mp4", label: "Видео 1" },
  { src: "/videos/team-2.mp4", label: "Видео 2" },
  { src: "/videos/team-3.mp4", label: "Видео 3" },
  { src: "/videos/team-4.mp4", label: "Видео 4" },
] as const;

export function Teachers() {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);

  // Esc to close + lock scroll while modal open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);

    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="teachers" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "teachers_title")}</div>
        <div className="text-muted mt-2 max-w-2xl">
          Преподаватели и менторы с опытом подготовки к поступлению и экзаменам. Подберём траекторию под ваш профиль.
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <Reveal className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4">
            {TEAM.map((m, idx) => (
              <motion.div key={m.name} whileHover={{ y: -3 }} className="glass rounded-3xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                      {/* ✅ твоя правка: object-[50%_20%] */}
                      <Image
                        src={m.avatar}
                        alt={m.name}
                        fill
                        className="object-cover object-[50%_20%]"
                      />
                    </div>

                    <div>
                      <div className="text-lg font-semibold">{m.name}</div>
                      <div className="text-sm text-muted mt-1">{m.role}</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted">{String(idx + 1).padStart(2, "0")}</div>
                </div>

                <ul className="mt-3 list-disc pl-5 text-sm text-muted space-y-1">
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="glass rounded-3xl p-5 overflow-hidden relative isolate">
            <div className="text-sm font-semibold">Foundation — атмосфера и команда</div>
            <div className="text-sm text-muted mt-1">Видео: формат занятий, аудитория, команда.</div>

            {/* ✅ ровно 4 видео */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {VIDEOS.map((v, i) => (
                <button
                  key={v.src}
                  onClick={() => setActive(v.src)}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/30 border border-white/10"
                >
                  {/* превью на паузе */}
                  <video
                    src={v.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />

                  {/* затемнение */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10 opacity-90" />

                  {/* кнопка */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm text-white border border-white/15 backdrop-blur">
                      <Play className="h-4 w-4" />
                      Смотреть
                    </div>
                  </div>

                  <div className="absolute left-2 bottom-2 text-xs text-white/80">
                    {v.label ?? `Видео ${i + 1}`}
                  </div>
                </button>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-64 w-64 rounded-full bg-[#800020]/16 blur-3xl" />
            <div className="pointer-events-none absolute -left-28 -bottom-28 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>
        </Reveal>
      </div>

      {/* ✅ MODAL (крестик всегда виден) */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          {/* фон */}
          <button
            aria-label="Закрыть"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />

          {/* окно */}
          <div className="relative z-50 w-full max-w-[420px] sm:max-w-[520px]">
            <button
              onClick={() => setActive(null)}
              className="absolute -top-3 -right-3 z-[60] h-11 w-11 rounded-full bg-black/70 hover:bg-black/85 text-white border border-white/15 grid place-items-center shadow-xl"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <video
                key={active}
                src={active}
                controls
                autoPlay
                playsInline
                className="w-full h-[70vh] max-h-[720px] object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

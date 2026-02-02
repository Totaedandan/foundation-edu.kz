"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { X, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TEAM = [
  {
    avatar: "/images/1.png",
    name: "Алибек Акимбай",
    role: "Директор",
    points: [
      "Эксперт с более 5-летним опытом в сфере образования и академического управления",
      "Выпускник Nazarbayev University и National University of Singapore",
    ],
  },
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
    avatar: "/images/nurdaulet.png",
    name: "Нурдаулет Елубай, PhD",
    role: "SAT & NUET эксперт",
    points: ["Выпускник University of Milano-Bicocca", "5+ лет опыта в преподавании","Ex-сотрудник British Council"],
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
    points: ["Выпускница Nazarbayev University", "Dean's List (Fall 2022, Spring 2023)", "Президент NU Turkish Club","5 лет опыта преподавания"],
  },
] as const;

const VIDEOS = [
  { src: "/videos/team-1.mp4", label: "Видео 1" },
  { src: "/videos/team-2.mp4", label: "Видео 2" },
  { src: "/videos/team-3.mp4", label: "Видео 3" },
  { src: "/videos/team-4.mp4", label: "Видео 4" },
] as const;

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function Teachers() {
  const { lang } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useLockBodyScroll(openIdx !== null);

  const openVideo = useMemo(() => {
    if (openIdx === null) return null;
    return VIDEOS[openIdx] ?? null;
  }, [openIdx]);

  return (
    <section id="teachers" className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">{t(lang, "teachers_title")}</div>
        <div className="text-muted mt-2 max-w-2xl text-sm sm:text-base">
          {lang === "kz"
            ? "Оқытушылар мен менторлар: емтиханға және оқуға түсуге дайындық тәжірибесі бар команда."
            : "Преподаватели и менторы с опытом подготовки к поступлению и экзаменам. Подберём траекторию под ваш профиль."}
        </div>
      </Reveal>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <Reveal className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {TEAM.map((m, idx) => (
              <motion.div
                key={m.name}
                whileHover={{ y: -2 }}
                className="glass rounded-3xl p-4 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* ✅ bigger avatars */}
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] shrink-0">
                      <Image
                        src={m.avatar}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        priority={idx < 2}
                        className="object-cover object-[50%_18%]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-base sm:text-lg font-semibold">{m.name}</div>
                      <div className="text-sm text-muted mt-1">{m.role}</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted shrink-0">0{idx + 1}</div>
                </div>

                <ul className="mt-3 list-disc pl-5 text-sm text-muted space-y-1">
                  {m.points.map((p) => (
                    <li key={p} className="line-clamp-2 sm:line-clamp-none">
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="glass rounded-3xl p-4 sm:p-5 overflow-hidden relative isolate">
            <div className="text-sm font-semibold">
              {lang === "kz" ? "Foundation — атмосфера және команда" : "Foundation — атмосфера и команда"}
            </div>
            <div className="text-sm text-muted mt-1">
              {lang === "kz" ? "Видео: формат сабақтар, аудитория, команда." : "Видео: формат занятий, аудитория, команда."}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {VIDEOS.map((v, i) => (
                <button
                  key={v.src}
                  onClick={() => setOpenIdx(i)}
                  className="group relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/8 hover:border-white/15 transition"
                >
                  <video className="h-full w-full object-cover" preload="metadata" playsInline muted>
                    <source src={v.src} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[11px] text-white/80">{v.label}</div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-white backdrop-blur-sm border border-white/10 group-hover:bg-black/50 transition">
                      <Play className="h-4 w-4" />
                      {lang === "kz" ? "Көру" : "Смотреть"}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-64 w-64 rounded-full bg-[#800020]/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-28 -bottom-28 -z-10 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              className="relative z-[101] w-full max-w-[920px] overflow-hidden rounded-3xl border border-white/10 bg-[#050B18] shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute right-3 top-3 z-[102] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/70 border border-white/15 text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-3 sm:p-4">
                <video key={openVideo.src} controls autoPlay playsInline className="w-full rounded-2xl bg-black">
                  <source src={openVideo.src} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

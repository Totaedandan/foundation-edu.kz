"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const GALLERY = [
  { src: "/images/p10_335_0941121d80.jpg", alt: "Gallery 1" },
  { src: "/images/p9_318_5ba8126ab5.jpg", alt: "Gallery 2" },
  { src: "/images/p7_258_0b94c9c2c1.jpg", alt: "Gallery 3" },

  // ✅ +2 фото (пока дублирую первое, потом заменишь)
  { src: "/images/IMG_1490.JPEG", alt: "Gallery 4" },
  { src: "/images/IMG_5262.jpg", alt: "Gallery 5" },
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

export function Hero() {
  const { lang } = useLang();

  // ✅ Carousel state (for Foundation Gallery card)
  const [slide, setSlide] = useState(0);

  const prevSlide = () => setSlide((s) => (s + GALLERY.length - 1) % GALLERY.length);
  const nextSlide = () => setSlide((s) => (s + 1) % GALLERY.length);

  // lightbox
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const openItem = useMemo(() => {
    if (openIdx === null) return null;
    return GALLERY[openIdx] ?? null;
  }, [openIdx]);

  useLockBodyScroll(openIdx !== null);

  useEffect(() => {
    if (openIdx === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowLeft")
        setOpenIdx((i) => (i === null ? null : (i + GALLERY.length - 1) % GALLERY.length));
      if (e.key === "ArrowRight")
        setOpenIdx((i) => (i === null ? null : (i + 1) % GALLERY.length));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  return (
    <div id="top" className="relative overflow-hidden pt-16 sm:pt-20">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/p1_17_308277bd7c.png"
          alt=""
          fill
          priority
          className="object-cover opacity-20 blur-[1px]"
        />

        {/* Harvard building */}
        <Image
          src="/images/harvard.png"
          alt=""
          fill
          className="
            object-cover object-left
            opacity-[0.18] sm:opacity-[0.26]
            contrast-125 brightness-90 saturate-110
            [mask-image:radial-gradient(ellipse_at_left,black_0%,black_55%,transparent_80%)]
          "
        />

        {/* Burgundy tint */}
        <div className="absolute inset-0 bg-[#800020]/10 mix-blend-multiply" />

        {/* Main overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040B1B]/35 via-[#040B1B]/70 to-[#040B1B]/92" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040B1B]/10 via-transparent to-[#040B1B]/65" />

        {/* subtle dot/grid pattern */}
        <div className="absolute inset-0 bg-grid-soft opacity-[0.24] mix-blend-overlay [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />

        {/* burgundy blurs */}
        <div className="absolute -left-32 -top-44 h-[520px] w-[520px] sm:h-[560px] sm:w-[560px] rounded-full bg-[#800020]/18 blur-3xl" />
        <div className="absolute -right-32 top-24 h-[520px] w-[520px] sm:h-[560px] sm:w-[560px] rounded-full bg-[#800020]/12 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[240px] w-[240px] sm:h-[260px] sm:w-[260px] rounded-full bg-[#800020]/10 blur-3xl" />
        <div className="absolute left-1/2 -bottom-56 h-[460px] w-[460px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 rounded-full bg-[#800020]/08 blur-3xl" />

        {/* мягкий “fade” снизу */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-24 bg-gradient-to-b from-transparent via-[#040B1B]/55 to-[#040B1B] blur-[1px]" />
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-8 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start pt-4 sm:pt-8">
          {/* RIGHT (form) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2">
            <Reveal delay={0.08}>
              <LeadForm />
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-3 sm:mt-4 relative glass rounded-3xl overflow-hidden p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[12px] sm:text-sm text-muted">
                    {t(lang, "visual_note")}
                  </div>

                  {/* маленький индикатор */}
                  <div className="text-[11px] text-muted">
                    {slide + 1}/{GALLERY.length}
                  </div>
                </div>

                {/* ✅ Carousel (one big frame + arrows) */}
                <div className="mt-3 relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(slide)}
                    className="relative block w-full aspect-[16/10] sm:aspect-[16/9]"
                    aria-label="Open gallery image"
                  >
                    <Image
                      key={GALLERY[slide].src + slide}
                      src={GALLERY[slide].src}
                      alt={GALLERY[slide].alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-[11px] text-white/85 bg-black/35 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      Foundation Gallery
                    </div>
                  </button>

                  {/* arrows */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* ✅ optional thumbnails row (compact) */}
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {GALLERY.slice(0, 5).map((g, idx) => {
                    const active = idx === slide;
                    return (
                      <button
                        key={g.alt + idx}
                        type="button"
                        onClick={() => setSlide(idx)}
                        className={
                          "relative aspect-[3/4] rounded-xl overflow-hidden border transition " +
                          (active ? "border-white/35" : "border-white/10 hover:border-white/20")
                        }
                        aria-label={`Go to photo ${idx + 1}`}
                      >
                        <Image
                          src={g.src}
                          alt={g.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        <div
                          className={
                            "absolute inset-0 transition " + (active ? "bg-black/0" : "bg-black/25")
                          }
                        />
                      </button>
                    );
                  })}
                </div>

                <Image
                  src="/images/p1_21_d4066d3a7f.png"
                  alt=""
                  width={900}
                  height={450}
                  className="pointer-events-none absolute -right-24 -bottom-24 opacity-[0.08]"
                />
              </div>
            </Reveal>
          </div>

          {/* LEFT (text) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal delay={0.05}>
              <h1 className="mt-1 sm:mt-2 text-[28px] leading-[1.12] sm:text-5xl font-semibold">
                {t(lang, "hero_title")}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-lg text-muted max-w-xl">
                {t(lang, "hero_sub")}
              </p>
            </Reveal>

            {/* BIG IELTS/UKVI + British Council card */}
            <Reveal delay={0.16}>
              <div className="mt-5 sm:mt-6">
                <div className="glass rounded-3xl p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-lg sm:text-xl font-semibold">
                        Официальный тестовый центр IELTS и UKVI
                      </div>
                      <div className="text-sm sm:text-base text-muted mt-1">
                        {t(lang, "hero_card1_p")}
                      </div>
                    </div>

                    <div className="shrink-0 rounded-2xl bg-[#F5F5F5] p-3 sm:p-4 border border-[#B0B0B0]/35 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
                      <img
                        src="/logos/british-council.png"
                        alt="British Council"
                        className="h-12 sm:h-16 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* “Кому подходит” */}
            <Reveal delay={0.22}>
              <div id="for" className="mt-6 sm:mt-7 glass rounded-3xl p-4 sm:p-6">
                <div className="text-lg sm:text-xl font-semibold">{t(lang, "for_title")}</div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-sm">
                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_1_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">{t(lang, "for_1_p")}</div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_2_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">{t(lang, "for_2_p")}</div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_3_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">{t(lang, "for_3_p")}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      {/* Lightbox modal */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            <motion.div
              className="relative z-[121] w-full max-w-[980px] overflow-hidden rounded-3xl border border-white/10 bg-[#050B18] shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
              initial={{ scale: 0.985, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.985, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* close */}
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute right-3 top-3 z-[122] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 hover:bg-black/70 border border-white/15 text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* prev/next */}
              <button
                onClick={() =>
                  setOpenIdx((i) => (i === null ? null : (i + GALLERY.length - 1) % GALLERY.length))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 z-[122] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => setOpenIdx((i) => (i === null ? null : (i + 1) % GALLERY.length))}
                className="absolute right-14 top-1/2 -translate-y-1/2 z-[122] inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="p-3 sm:p-4">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={openItem.src}
                    alt={openItem.alt}
                    fill
                    sizes="(max-width: 1024px) 95vw, 980px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

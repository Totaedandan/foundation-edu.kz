"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";

export function Hero() {
  const { lang } = useLang();

  return (
    <div className="relative overflow-hidden pt-16 sm:pt-20">
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

        {/* мягкий “fade” снизу — чтобы не было резкой границы с следующей секцией */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-24 bg-gradient-to-b from-transparent via-[#040B1B]/55 to-[#040B1B] blur-[1px]" />
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-8 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start pt-4 sm:pt-8">
          {/* RIGHT (form) — first on mobile */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2">
            <Reveal delay={0.08}>
              <LeadForm />
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-3 sm:mt-4 relative glass rounded-3xl overflow-hidden p-4 sm:p-5">
                <div className="text-[12px] sm:text-sm text-muted">
                  {t(lang, "visual_note")}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/p10_335_0941121d80.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/p9_318_5ba8126ab5.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/p7_258_0b94c9c2c1.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
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

          {/* LEFT (text) — second on mobile */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] sm:text-sm text-muted shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Foundation • Your Gateway to Higher Education
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-3 sm:mt-4 text-[28px] leading-[1.12] sm:text-5xl font-semibold">
                {t(lang, "hero_title")}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-lg text-muted max-w-xl">
                {t(lang, "hero_sub")}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2">
                <div className="accent inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] sm:text-sm">
                  <span className="inline-flex h-6 w-10 items-center justify-center rounded-md bg-[#800020] text-white font-bold text-[11px]">
                    IELTS
                  </span>
                  <span className="text-[12px] sm:text-sm text-white">
                    {t(lang, "hero_badge_1")}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[12px] sm:text-sm text-muted shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                  {t(lang, "hero_badge_2")}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="text-[11px] sm:text-xs text-muted">
                  {lang === "kz" ? "ЖОО" : "Университеты"}:
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Image
                    src="/images/nu-logo.png"
                    alt="NU"
                    width={120}
                    height={32}
                    className="h-6 sm:h-7 w-auto opacity-80"
                  />
                  <Image
                    src="/images/nus-logo-white-b-horizontal.png"
                    alt="NUS"
                    width={120}
                    height={32}
                    className="h-6 sm:h-7 w-auto opacity-80"
                  />
                  <Image
                    src="/images/MIT-logo.png"
                    alt="MIT"
                    width={56}
                    height={32}
                    className="h-5 sm:h-6 w-auto opacity-75"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass rounded-2xl p-3.5 sm:p-4">
                  <div className="font-semibold">{t(lang, "hero_card1_t")}</div>
                  <div className="text-sm text-muted mt-1 line-clamp-3 sm:line-clamp-none">
                    {t(lang, "hero_card1_p")}
                  </div>
                </div>

                <div className="glass rounded-2xl p-3.5 sm:p-4">
                  <div className="font-semibold">{t(lang, "hero_card2_t")}</div>
                  <div className="text-sm text-muted mt-1 line-clamp-3 sm:line-clamp-none">
                    {t(lang, "hero_card2_p")}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div id="for" className="mt-6 sm:mt-8 glass rounded-3xl p-4 sm:p-6">
                <div className="text-lg sm:text-xl font-semibold">
                  {t(lang, "for_title")}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-sm">
                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_1_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">
                      {t(lang, "for_1_p")}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_2_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">
                      {t(lang, "for_2_p")}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3.5 sm:p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
                    <div className="font-semibold">{t(lang, "for_3_h")}</div>
                    <div className="text-muted mt-1 line-clamp-3 sm:line-clamp-none">
                      {t(lang, "for_3_p")}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}

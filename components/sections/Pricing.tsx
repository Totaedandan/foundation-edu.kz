"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { pricing } from "@/lib/content";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function formatKZT(v: number | null) {
  if (v === null) return "Индивидуально";
  return v.toLocaleString("ru-RU") + " ₸";
}

export function Pricing() {
  const { lang } = useLang();

  return (
    <section
      id="pricing"
      className="relative isolate mx-auto max-w-6xl px-4 py-12 sm:py-16 overflow-hidden"
    >
      {/* мягкий переход секции */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      {/* decorative blobs behind */}
      <div className="pointer-events-none absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-[#800020]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-[#800020]/12 blur-3xl" />

      <div className="relative z-10">
        <Reveal>
          <div className="text-2xl sm:text-3xl font-semibold">
            {t(lang, "pricing_title")}
          </div>
          <div className="text-muted mt-2">{t(lang, "pricing_sub")}</div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {/* table */}
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-3xl p-3 sm:p-4">
              {/* header desktop */}
              <div className="hidden sm:grid grid-cols-2 px-4 py-3 rounded-2xl bg-white/6 text-sm text-muted shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                <div>{lang === "kz" ? "Қызмет" : "Услуга"}</div>
                <div className="text-right">
                  {lang === "kz" ? "Баға / ай" : "Цена / месяц"}
                </div>
              </div>

              {/* header mobile */}
              <div className="sm:hidden px-4 py-3 rounded-2xl bg-white/6 text-sm text-muted shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                {lang === "kz" ? "Бағалар (айына)" : "Цены (за месяц)"}
              </div>

              <div className="mt-3 space-y-2">
                {pricing.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl bg-white/[0.045] hover:bg-white/[0.07] transition shadow-[0_18px_60px_rgba(0,0,0,0.28)] px-4 py-4"
                  >
                    {/* desktop layout */}
                    <div className="hidden sm:grid grid-cols-2 items-center">
                      <div className="font-medium">
                        {p.title}
                        {p.price === null && (
                          <div className="mt-1 text-xs text-muted">
                            {lang === "kz"
                              ? "Бағасы сабақ ұзақтығына байланысты жеке есептеледі"
                              : "Стоимость рассчитывается индивидуально в зависимости от продолжительности занятия"}
                          </div>
                        )}
                      </div>

                      <div className="text-right font-semibold">
                        {formatKZT(p.price)}
                      </div>
                    </div>

                    {/* mobile layout (stacked) */}
                    <div className="sm:hidden">
                      <div className="font-medium">{p.title}</div>

                      {p.price === null ? (
                        <div className="mt-1 text-sm text-muted">
                          {lang === "kz"
                            ? "Бағасы сабақ ұзақтығына байланысты жеке есептеледі"
                            : "Стоимость рассчитывается индивидуально в зависимости от продолжительности занятия"}
                        </div>
                      ) : (
                        <div className="mt-1 text-sm text-muted">
                          {lang === "kz" ? "Айына" : "В месяц"}:{" "}
                          <span className="font-semibold text-white">
                            {formatKZT(p.price)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* what included */}
          <Reveal delay={0.08} className="lg:col-span-1">
            <motion.div
              whileHover={{ y: -3 }}
              className="glass rounded-3xl p-5 sm:p-6 lg:sticky lg:top-28"
            >
              <div className="text-lg font-semibold">
                {lang === "kz" ? "Құрамында" : "Что входит"}
              </div>

              <ul className="mt-3 space-y-2 text-sm text-muted">
                {[
                  lang === "kz"
                    ? "Диагностика және жоспар"
                    : "Диагностика и план",
                  lang === "kz"
                    ? "12–18 сағат/ай сабақ"
                    : "Занятия 12–18 часов/мес",
                  lang === "kz"
                    ? "Үй жұмысы және тексеру"
                    : "Домашние задания и проверка",
                  lang === "kz"
                    ? "Поступление таймлайны"
                    : "Рекомендации по таймлайну поступления",
                  lang === "kz"
                    ? "Егжей-тегжейлі талдаумен Mock сынақтары"
                    : "Mock-тесты с детальным разбором",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-300 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  document
                    .getElementById("lead-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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

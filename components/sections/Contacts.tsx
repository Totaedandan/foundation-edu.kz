"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { Mail, Phone, Instagram, MapPin, Clock, Map } from "lucide-react";

function env(name: string, fallback = "") {
  const v = (process.env as any)[name] as string | undefined;
  return v || fallback;
}

export function Contacts() {
  const { lang } = useLang();
  const phone = env("NEXT_PUBLIC_WHATSAPP_NUMBER", "+7 (707) 131 65 17");
  const wa = env("NEXT_PUBLIC_WHATSAPP_LINK", "https://wa.me/77071316517");
  const email = env("NEXT_PUBLIC_CONTACT_EMAIL", "foundation.edu.kz@gmail.com");
  const ig = env("NEXT_PUBLIC_INSTAGRAM_URL", "https://instagram.com/foundation_kz");
  const a2 = env(
    "NEXT_PUBLIC_ADDRESS_LINE_2",
    'Шымкент, пр. Назарбаева 141а, БЦ "ANB Smart Offices", 4 этаж'
  );

  const gis = env(
    "NEXT_PUBLIC_2GIS_URL",
    "https://2gis.kz/shymkent/search/ANB%20Smart%20Offices%20%D0%A8%D1%8B%D0%BC%D0%BA%D0%B5%D0%BD%D1%82"
  );

  return (
    <section id="contacts" className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* мягкий переход секции */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-[#040B1B] via-[#040B1B]/55 to-transparent blur-[1px]" />

      <Reveal>
        <div className="text-2xl sm:text-3xl font-semibold">
          {t(lang, "contacts_title")}
        </div>
        <div className="text-muted mt-2 text-sm sm:text-base">
          Свяжитесь с нами удобным способом — и мы проведём бесплатную консультацию.
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Reveal className="lg:col-span-2">
          <div className="glass rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group relative isolate rounded-3xl bg-white/6 p-4 sm:p-5 overflow-hidden hover:bg-white/10 transition border border-white/8 hover:border-white/14 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-[#800020]/22 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(245,245,245,0.08),_transparent_55%)]" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 font-semibold">
                      <Phone className="h-5 w-5" /> WhatsApp
                    </div>
                    <span className="text-[10px] uppercase tracking-wide rounded-full bg-[#800020]/20 px-2 py-1 text-[#F5F5F5]/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                      online
                    </span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-black/22 px-3 py-1 text-sm text-[#F5F5F5] shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {phone}
                  </div>

                  <div className="mt-3 text-xs text-muted">
                    Нажмите — откроем чат в WhatsApp
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="rounded-3xl bg-white/6 p-4 sm:p-5 hover:bg-white/10 transition shadow-[0_18px_60px_rgba(0,0,0,0.35)] border border-transparent hover:border-white/8"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Mail className="h-5 w-5" /> Email
                </div>
                <div className="mt-2 text-sm text-muted break-all">{email}</div>
              </a>

              <a
                href={ig}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl bg-white/6 p-4 sm:p-5 hover:bg-white/10 transition shadow-[0_18px_60px_rgba(0,0,0,0.35)] border border-transparent hover:border-white/8"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Instagram className="h-5 w-5" /> Instagram
                </div>
                <div className="mt-2 text-sm text-muted">@foundation_kz</div>
              </a>

              <div className="rounded-3xl bg-white/6 p-4 sm:p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="h-5 w-5" />{" "}
                  {lang === "kz" ? "Жұмыс уақыты" : "График работы"}
                </div>
                <div className="mt-2 text-sm text-muted">
                  {lang === "kz" ? (
                    <>
                      Дс–Сб: 10:00–20:00 <br />
                      Жс: демалыс
                    </>
                  ) : (
                    <>
                      Пн–Сб: 10:00–20:00 <br />
                      Вс: выходной
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <div className="font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" /> {lang === "kz" ? "Мекенжай" : "Адреса"}
              </div>

              <div className="mt-2 text-sm text-muted space-y-2">
                <div>{a2}</div>

                <a
                  href={gis}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
                >
                  <Map className="h-4 w-4" />
                  {lang === "kz" ? "2GIS-та ашу" : "Открыть в 2GIS"}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass rounded-3xl p-4 sm:p-6 overflow-hidden relative isolate">
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-56 w-56 rounded-full bg-[#800020]/16 blur-3xl" />
            <div className="pointer-events-none absolute left-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#800020]/10 blur-3xl" />

            <div className="relative">
              <div className="text-sm text-muted">
                {lang === "kz" ? "Ресми мәртебе" : "Официальный статус"}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {lang === "kz"
                  ? "IELTS/UKVI тесті • ресми орталық"
                  : "IELTS/UKVI тест • официальный центр"}
              </div>
              <div className="mt-2 text-sm text-muted line-clamp-5 sm:line-clamp-none">
                {lang === "kz"
                  ? "British Council атынан өңірдегі тесті тапсыруға көмектесеміз. Тіркелу, дайындық, нәтижеге дейін сүйемелдеу."
                  : "Выступаем от имени British Council в регионе. Поможем с регистрацией, подготовкой и доведём до результата."}
              </div>

              <div className="mt-4 sm:mt-5 flex items-center gap-3">
                <div className="rounded-2xl bg-[#F5F5F5] p-3 border border-[#B0B0B0]/30">
                  <img src="/logos/ielts.png" alt="IELTS" className="h-7 w-auto" />
                </div>
                <div className="rounded-2xl bg-[#F5F5F5] p-3 border border-[#B0B0B0]/30">
                  <img src="/logos/british-council.png" alt="British Council" className="h-7 w-auto" />
                </div>
              </div>

              <button
                onClick={() =>
                  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 sm:mt-6 w-full rounded-2xl bg-[#800020] hover:bg-[#6a001b] px-4 py-3 font-semibold transition shadow-lg shadow-black/20"
              >
                {t(lang, "cta_consult")}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

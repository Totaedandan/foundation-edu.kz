"use client";

import { useState } from "react";
import { useLang } from "@/components/lang";

type FormState = {
  name: string;
  grade: string;
  city: string;
  whatsapp: string;
  direction: string;
  program: string;
};

export function LeadForm() {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    grade: "",
    city: "",
    whatsapp: "",
    direction: "foreign",
    program: "ielts",
  });

  async function submit() {
    setLoading(true);
    setOk(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad");
      setOk(lang === "kz" ? "Өтінім жіберілді!" : "Заявка отправлена!");
      setForm({
        name: "",
        grade: "",
        city: "",
        whatsapp: "",
        direction: "foreign",
        program: "ielts",
      });
    } catch {
      setOk(lang === "kz" ? "Қате. Қайта көріңіз." : "Ошибка. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  const title = lang === "kz" ? "Тегін кеңес алу" : "Бесплатная консультация";
  const sub =
    lang === "kz"
      ? "Өтінім қалдырыңыз — біз сізге хабарласамыз."
      : "Оставьте заявку — мы свяжемся с вами.";

  const directions =
    lang === "kz"
      ? [
          { v: "foreign", l: "Шетелдік ЖОО" },
          { v: "nu", l: "Nazarbayev University" },
          { v: "kz-top", l: "Қазақстанның топ ЖОО" },
          { v: "idk", l: "Әлі білмеймін" },
        ]
      : [
          { v: "foreign", l: "Зарубежные вузы" },
          { v: "nu", l: "Nazarbayev University" },
          { v: "kz-top", l: "Топовые вузы Казахстана" },
          { v: "idk", l: "Пока не знаю" },
        ];

  return (
    <div id="lead-form" className="glass rounded-3xl p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted">{sub}</div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder={lang === "kz" ? "Аты" : "Имя"}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        />
        <input
          value={form.grade}
          onChange={(e) => setForm((s) => ({ ...s, grade: e.target.value }))}
          placeholder={lang === "kz" ? "Сынып" : "Класс"}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        />
        <input
          value={form.city}
          onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
          placeholder={lang === "kz" ? "Қала" : "Город"}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        />
        <input
          value={form.whatsapp}
          onChange={(e) => setForm((s) => ({ ...s, whatsapp: e.target.value }))}
          placeholder={lang === "kz" ? "WhatsApp нөмірі" : "WhatsApp номер"}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        />

        <select
          value={form.direction}
          onChange={(e) => setForm((s) => ({ ...s, direction: e.target.value }))}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        >
          {directions.map((d) => (
            <option key={d.v} value={d.v} className="text-black">
              {d.l}
            </option>
          ))}
        </select>

        <select
          value={form.program}
          onChange={(e) => setForm((s) => ({ ...s, program: e.target.value }))}
          className="h-11 rounded-2xl bg-white/5 px-4 outline-none border border-white/10 focus:border-white/20"
        >
          <option value="ielts" className="text-black">
            IELTS / UKVI
          </option>
          <option value="sat" className="text-black">
            SAT
          </option>
          <option value="ap" className="text-black">
            AP
          </option>
          <option value="counseling" className="text-black">
            {lang === "kz" ? "Кеңес беру / Admission" : "Counseling / Admission"}
          </option>
        </select>
      </div>

      <button
        disabled={loading}
        onClick={submit}
        className="mt-4 w-full rounded-2xl bg-[#800020] hover:bg-[#6a001b] px-4 py-3 font-semibold transition shadow-lg shadow-black/20 disabled:opacity-60"
      >
        {loading ? (lang === "kz" ? "Жіберілуде..." : "Отправка...") : (lang === "kz" ? "Жіберу" : "Отправить")}
      </button>

      {ok && <div className="mt-3 text-sm text-muted">{ok}</div>}
    </div>
  );
}

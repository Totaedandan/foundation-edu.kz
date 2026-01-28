"use client";

import { useState } from "react";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { motion } from "framer-motion";

type LeadPayload = {
  name: string;
  grade: string;
  city: string;
  whatsapp: string;
  goal: string;
  interest: string;
  lang: string;
};

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    grade: "",
    city: "",
    whatsapp: "",
    goal: "world",
    interest: "ielts",
    lang,
  });

  const onChange = (k: keyof LeadPayload, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setLoading(true);
    try {
      const payload: LeadPayload = { ...form, lang };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      setForm({ name: "", grade: "", city: "", whatsapp: "", goal: "world", interest: "ielts", lang });
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-2xl bg-white border border-[#B0B0B0]/60 px-4 py-3 text-[#040B1B] placeholder:text-[#040B1B]/50 outline-none focus:ring-2 focus:ring-[#800020]/25 focus:border-[#800020]/40 transition";

  return (
    <div
      id="lead-form"
      className={
        "rounded-3xl p-6 sm:p-7 bg-[#F5F5F5] text-[#040B1B] border border-[#B0B0B0]/35 " +
        (compact ? "" : "shadow-2xl shadow-black/30")
      }
    >
      <div className="mb-5">
        <div className="text-lg font-semibold">{t(lang, "form_title")}</div>
        <div className="text-sm text-[#040B1B]/70 mt-1">{t(lang, "form_sub")}</div>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={inputCls} value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder={t(lang, "name")} required />
        <input className={inputCls} value={form.grade} onChange={(e) => onChange("grade", e.target.value)} placeholder={t(lang, "grade")} />
        <input className={inputCls} value={form.city} onChange={(e) => onChange("city", e.target.value)} placeholder={t(lang, "city")} />
        <input className={inputCls} value={form.whatsapp} onChange={(e) => onChange("whatsapp", e.target.value)} placeholder={t(lang, "whatsapp")} required />

        <select className={inputCls} value={form.goal} onChange={(e) => onChange("goal", e.target.value)}>
          <option value="world">{t(lang, "goal_world")}</option>
          <option value="kz">{t(lang, "goal_kz")}</option>
          <option value="unsure">{t(lang, "goal_unsure")}</option>
        </select>

        <select className={inputCls} value={form.interest} onChange={(e) => onChange("interest", e.target.value)}>
          <option value="ielts">{t(lang, "interest_ielts")}</option>
          <option value="sat">{t(lang, "interest_sat")}</option>
          <option value="ap">{t(lang, "interest_ap")}</option>
          <option value="research">{t(lang, "interest_research")}</option>
          <option value="counseling">{t(lang, "interest_counseling")}</option>
          <option value="english">{t(lang, "interest_english")}</option>
        </select>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="sm:col-span-2 rounded-2xl bg-[#800020] hover:bg-[#6a001b] disabled:opacity-60 px-4 py-3 font-semibold transition shadow-lg shadow-black/20 text-white"
          type="submit"
        >
          {loading ? "..." : t(lang, "send")}
        </motion.button>

        {status === "ok" && <div className="sm:col-span-2 text-sm text-emerald-700">{t(lang, "sent_ok")}</div>}
        {status === "err" && <div className="sm:col-span-2 text-sm text-[#800020]">{t(lang, "sent_err")}</div>}
      </form>
    </div>
  );
}

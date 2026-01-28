"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/components/lang";
import { t } from "@/lib/i18n";
import { LogOut, Download } from "lucide-react";

type LeadRow = {
  id: number;
  created_at: string;
  name: string;
  grade?: string | null;
  city?: string | null;
  whatsapp: string;
  goal?: string | null;
  interest?: string | null;
  lang?: string | null;
};

export default function AdminPage() {
  const { lang } = useLang();
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("foundation_admin_pass");
    if (stored) setPass(stored);
  }, []);

  async function load(p: string) {
    setError(null);
    const res = await fetch("/api/admin/leads", { headers: { "x-admin-password": p } });
    if (!res.ok) {
      setError("Unauthorized");
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setRows(data.rows || []);
    setAuthed(true);
    window.localStorage.setItem("foundation_admin_pass", p);
  }

  const exportUrl = useMemo(() => "/api/admin/leads?format=csv", []);

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="glass rounded-3xl p-7 w-full max-w-md">
          <div className="text-xl font-semibold">{t(lang, "admin_title")}</div>
          <div className="text-sm text-muted mt-2">Введите пароль администратора.</div>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={t(lang, "admin_password")}
            className="mt-4 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#800020]/25 focus:border-[#800020]/40 transition"
            type="password"
          />
          <button
            onClick={() => load(pass)}
            className="mt-4 w-full rounded-2xl bg-[#800020] hover:bg-[#6a001b] px-4 py-3 font-semibold transition shadow-lg shadow-black/20"
          >
            {t(lang, "admin_login")}
          </button>
          {error && <div className="mt-3 text-sm text-rose-300">{error}</div>}
          <div className="mt-4 text-xs text-muted">
            Пароль хранится на сервере в <code className="text-white/80">ADMIN_PASSWORD</code>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-2xl font-semibold">{t(lang, "admin_leads")}</div>
            <div className="text-sm text-muted mt-1">Всего: {rows.length}</div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={exportUrl}
              onClick={(e) => {
                // ensure auth header is applied via fetch + blob
                e.preventDefault();
                fetch(exportUrl, { headers: { "x-admin-password": pass } })
                  .then((r) => r.text())
                  .then((csv) => {
                    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "leads.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  });
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm font-semibold transition"
            >
              <Download className="h-4 w-4" />
              {t(lang, "admin_export")}
            </a>

            <button
              onClick={() => {
                setAuthed(false);
                setRows([]);
                window.localStorage.removeItem("foundation_admin_pass");
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold transition"
            >
              <LogOut className="h-4 w-4" />
              {t(lang, "admin_logout")}
            </button>
          </div>
        </div>

        <div className="mt-6 glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-white/10 text-xs text-muted">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Дата</div>
            <div className="col-span-3">Имя</div>
            <div className="col-span-3">WhatsApp</div>
            <div className="col-span-3">Интерес</div>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-6 text-sm text-muted">{t(lang, "admin_empty")}</div>
          ) : (
            rows.map((r) => (
              <div key={r.id} className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-white/5 text-sm">
                <div className="col-span-1 text-muted">{r.id}</div>
                <div className="col-span-2 text-muted">{new Date(r.created_at).toLocaleString()}</div>
                <div className="col-span-3 font-medium">{r.name}</div>
                <div className="col-span-3">{r.whatsapp}</div>
                <div className="col-span-3 text-muted">{r.interest || "-"}</div>
                <div className="col-span-12 text-xs text-muted mt-1">
                  {r.city ? `Город: ${r.city} • ` : ""}{r.grade ? `Класс: ${r.grade} • ` : ""}{r.goal ? `Цель: ${r.goal}` : ""}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 text-xs text-muted">
          База лидов: <code className="text-white/80">Vercel Postgres</code>.
        </div>
      </div>
    </div>
  );
}

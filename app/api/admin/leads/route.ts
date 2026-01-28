export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb, LeadRow } from "@/lib/db";

function isAuthed(req: Request) {
  const pass = req.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || "";
  return expected.length > 0 && pass === expected;
}

function toCsv(rows: LeadRow[]) {
  const header = ["id","created_at","name","whatsapp","city","grade","goal","interest","lang"];
  const escape = (v: any) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return '"' + s.replaceAll('"','""') + '"';
    return s;
  };
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([r.id, r.created_at, r.name, r.whatsapp, r.city, r.grade, r.goal, r.interest, r.lang].map(escape).join(","));
  }
  return lines.join("\n");
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const rows = db.prepare("SELECT * FROM leads ORDER BY id DESC").all() as LeadRow[];

  const url = new URL(req.url);
  const format = url.searchParams.get("format");

  if (format === "csv") {
    const csv = toCsv(rows);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  return NextResponse.json({ ok: true, rows }, { headers: { "cache-control": "no-store" } });
}

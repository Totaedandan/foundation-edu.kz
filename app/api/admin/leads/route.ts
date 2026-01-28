import { NextResponse } from "next/server";
import { listLeads } from "@/lib/db";

export const runtime = "nodejs";

function isAuthed(req: Request) {
  const pass = req.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || "";
  return !!expected && pass === expected;
}

function escapeCsv(v: any) {
  const s = String(v ?? "");
  // CSV escaping: wrap in quotes + escape quotes
  return `"${s.replace(/"/g, '""')}"`;
}

function toCsv(rows: any[]) {
  const header = ["id", "created_at", "name", "grade", "city", "whatsapp", "goal", "interest", "lang"];
  const lines = [header.join(",")];

  for (const r of rows) {
    lines.push(
      [
        r.id,
        escapeCsv(r.created_at),
        escapeCsv(r.name),
        escapeCsv(r.grade),
        escapeCsv(r.city),
        escapeCsv(r.whatsapp),
        escapeCsv(r.goal),
        escapeCsv(r.interest),
        escapeCsv(r.lang),
      ].join(",")
    );
  }

  return lines.join("\n");
}

export async function GET(req: Request) {
  try {
    if (!isAuthed(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const format = url.searchParams.get("format");

    const rows = await listLeads();

    if (format === "csv") {
      const csv = toCsv(rows);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="leads.csv"',
        },
      });
    }

    return NextResponse.json({ ok: true, rows });
  } catch (e: any) {
    console.error("GET /api/admin/leads error:", e);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

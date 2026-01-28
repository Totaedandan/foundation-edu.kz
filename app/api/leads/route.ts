export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const whatsapp = String(body?.whatsapp ?? "").trim();
    const grade = String(body?.grade ?? "").trim();
    const city = String(body?.city ?? "").trim();
    const goal = String(body?.goal ?? "").trim();
    const interest = String(body?.interest ?? "").trim();
    const lang = String(body?.lang ?? "").trim();

    if (!name || !whatsapp) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const db = getDb();
    const stmt = db.prepare(
      `INSERT INTO leads (name, grade, city, whatsapp, goal, interest, lang, created_at)
       VALUES (@name, @grade, @city, @whatsapp, @goal, @interest, @lang, @created_at)`
    );
    stmt.run({
      name,
      grade: grade || null,
      city: city || null,
      whatsapp,
      goal: goal || null,
      interest: interest || null,
      lang: lang || null,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { insertLead } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const whatsapp = String(body?.whatsapp ?? "").trim();

    if (!name || !whatsapp) {
      return NextResponse.json(
        { ok: false, error: "name and whatsapp are required" },
        { status: 400 }
      );
    }

    const created = await insertLead({
      name,
      whatsapp,
      grade: body?.grade ? String(body.grade).trim() : null,
      city: body?.city ? String(body.city).trim() : null,
      goal: body?.goal ? String(body.goal).trim() : null,
      interest: body?.interest ? String(body.interest).trim() : null,
      lang: body?.lang ? String(body.lang).trim() : null,
    });

    return NextResponse.json({ ok: true, id: created.id, created_at: created.created_at });
  } catch (e: any) {
    console.error("POST /api/leads error:", e);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}

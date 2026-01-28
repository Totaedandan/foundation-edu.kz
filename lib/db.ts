import { sql } from "@vercel/postgres";

export type LeadInsert = {
  name: string;
  whatsapp: string;
  grade?: string | null;
  city?: string | null;
  goal?: string | null;
  interest?: string | null;
  lang?: string | null;
};

export type LeadRow = {
  id: number;
  created_at: string; // ISO
  name: string;
  whatsapp: string;
  grade: string | null;
  city: string | null;
  goal: string | null;
  interest: string | null;
  lang: string | null;
};

export async function ensureSchema() {
  // Idempotent schema init (safe to call часто)
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      grade TEXT NULL,
      city TEXT NULL,
      whatsapp TEXT NOT NULL,
      goal TEXT NULL,
      interest TEXT NULL,
      lang TEXT NULL
    );
  `;
}

export async function insertLead(l: LeadInsert) {
  await ensureSchema();

  const { rows } = await sql<{
    id: number;
    created_at: Date;
  }>`
    INSERT INTO leads (name, grade, city, whatsapp, goal, interest, lang)
    VALUES (${l.name}, ${l.grade ?? null}, ${l.city ?? null}, ${l.whatsapp}, ${l.goal ?? null}, ${l.interest ?? null}, ${l.lang ?? null})
    RETURNING id, created_at;
  `;

  return {
    id: rows[0]?.id,
    created_at: rows[0]?.created_at?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function listLeads(): Promise<LeadRow[]> {
  await ensureSchema();

  const { rows } = await sql<{
    id: number;
    created_at: Date;
    name: string;
    grade: string | null;
    city: string | null;
    whatsapp: string;
    goal: string | null;
    interest: string | null;
    lang: string | null;
  }>`
    SELECT id, created_at, name, grade, city, whatsapp, goal, interest, lang
    FROM leads
    ORDER BY id DESC;
  `;

  return rows.map((r) => ({
    ...r,
    created_at: r.created_at?.toISOString?.() ?? new Date().toISOString(),
  }));
}

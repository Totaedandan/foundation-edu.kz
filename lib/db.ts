import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "foundation.db");

let db: Database.Database | null = null;

export function getDb() {
  if (db) return db;

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      grade TEXT,
      city TEXT,
      whatsapp TEXT NOT NULL,
      goal TEXT,
      interest TEXT,
      lang TEXT,
      created_at TEXT NOT NULL
    );
  `);

  return db;
}

export type LeadRow = {
  id: number;
  name: string;
  grade: string | null;
  city: string | null;
  whatsapp: string;
  goal: string | null;
  interest: string | null;
  lang: string | null;
  created_at: string;
};

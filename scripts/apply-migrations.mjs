import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const projectRef = "afyvzntrdqdjqrtpqksm";
const migrationsDir = resolve(process.cwd(), "supabase/migrations");

const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
const databaseUrl = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL;

function getMigrationFiles() {
  return readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

async function applyViaManagementApi(sql, label) {
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    },
  );

  const body = await response.text();

  if (!response.ok) {
    console.error(`FAIL: ${label}:`, body);
    process.exit(1);
  }

  console.log(`OK: ${label}`);
}

async function applyViaPostgres(sql, label) {
  const pg = await import("pg");
  const client = new pg.default.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log(`OK: ${label}`);
  } finally {
    await client.end();
  }
}

async function applyMigration(file) {
  const path = resolve(migrationsDir, file);
  const sql = readFileSync(path, "utf8");
  const label = `Applied ${file}`;

  if (accessToken) {
    await applyViaManagementApi(sql, label);
    return;
  }

  if (databaseUrl) {
    await applyViaPostgres(sql, label);
    return;
  }

  throw new Error("Missing SUPABASE_ACCESS_TOKEN or DATABASE_URL");
}

if (!existsSync(migrationsDir)) {
  console.error("FAIL: supabase/migrations not found.");
  process.exit(1);
}

const files = getMigrationFiles();

if (files.length === 0) {
  console.error("FAIL: No migration files found.");
  process.exit(1);
}

try {
  for (const file of files) {
    await applyMigration(file);
  }
} catch (error) {
  console.error(
    "FAIL:",
    error instanceof Error ? error.message : error,
    "\nSet SUPABASE_ACCESS_TOKEN or DATABASE_URL in .env.local.",
  );
  process.exit(1);
}

console.log(`OK: Applied ${files.length} migration file(s).`);

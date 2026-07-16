import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const projectRef = "afyvzntrdqdjqrtpqksm";
const migrationPath = resolve(
  process.cwd(),
  "supabase/migrations/20260716000000_auth_foundation.sql",
);

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const idx = line.indexOf("=");
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim().replace(/^"|"$/g, "")];
      })
      .filter(([key]) => key),
  );
}

const env = {
  ...loadEnvFile(resolve(process.cwd(), ".env.local")),
  ...loadEnvFile(resolve(process.cwd(), ".env.vercel.tmp")),
  ...process.env,
};

const accessToken = env.SUPABASE_ACCESS_TOKEN;
const databaseUrl = env.DATABASE_URL ?? env.SUPABASE_DB_URL;

if (!existsSync(migrationPath)) {
  console.error("FAIL: Auth migration file not found.");
  process.exit(1);
}

const sql = readFileSync(migrationPath, "utf8");

async function applyViaManagementApi() {
  if (!accessToken) {
    return false;
  }

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
    console.error("FAIL: Management API migration failed:", body);
    process.exit(1);
  }

  console.log("OK: Applied auth migration via Supabase Management API.");
  return true;
}

async function applyViaPostgres() {
  if (!databaseUrl) {
    return false;
  }

  const pg = await import("pg");
  const client = new pg.default.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log("OK: Applied auth migration via DATABASE_URL.");
    return true;
  } finally {
    await client.end();
  }
}

if (await applyViaManagementApi()) {
  process.exit(0);
}

if (await applyViaPostgres()) {
  process.exit(0);
}

console.error(
  "FAIL: Set SUPABASE_ACCESS_TOKEN (from https://supabase.com/dashboard/account/tokens) " +
    "or DATABASE_URL in .env.local to apply the auth migration.",
);
process.exit(1);

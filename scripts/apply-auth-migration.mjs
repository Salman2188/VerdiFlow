import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const migrationPath = resolve(
  process.cwd(),
  "supabase/migrations/20260716000000_auth_foundation.sql",
);

if (!existsSync(migrationPath)) {
  console.error("FAIL: Auth migration file not found.");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.error(
    "FAIL: Set DATABASE_URL or SUPABASE_DB_URL to apply the auth migration.",
  );
  process.exit(1);
}

const sql = readFileSync(migrationPath, "utf8");
const client = new pg.Client({ connectionString: databaseUrl });

try {
  await client.connect();
  await client.query(sql);
  console.log("OK: Applied auth foundation migration.");
} catch (error) {
  console.error("FAIL:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.end();
}

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const idx = line.indexOf("=");
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
      })
      .filter(([key]) => key),
  );
}

const env = loadEnvFile(resolve(process.cwd(), ".env.local"));
const databaseUrl = env.DATABASE_URL || env.SUPABASE_DB_URL;

if (!databaseUrl) {
  console.error(
    "FAIL: Add DATABASE_URL to .env.local to run the seed automatically.\n" +
      "Get it from Supabase Dashboard → Project Settings → Database → Connection string (URI).\n" +
      "Or run supabase/seed.sql manually in the SQL Editor:\n" +
      "https://supabase.com/dashboard/project/afyvzntrdqdjqrtpqksm/sql/new",
  );
  process.exit(1);
}

const seedPath = resolve(process.cwd(), "supabase/seed.sql");
const sql = readFileSync(seedPath, "utf8");

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  console.log("OK: Seed data applied from supabase/seed.sql");

  const counts = await client.query(`
    select
      (select count(*) from public.profiles) as profiles,
      (select count(*) from public.leads) as leads,
      (select count(*) from public.pipeline_stages) as pipeline_stages
  `);
  const row = counts.rows[0];
  console.log(
    `     profiles: ${row.profiles}, leads: ${row.leads}, pipeline_stages: ${row.pipeline_stages}`,
  );
} catch (error) {
  console.error("FAIL:", error.message);
  process.exit(1);
} finally {
  await client.end();
}

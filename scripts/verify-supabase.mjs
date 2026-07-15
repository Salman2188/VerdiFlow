import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env.local");

if (!existsSync(envPath)) {
  console.error("FAIL: .env.local not found in project root.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error(
    "FAIL: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
  );
  process.exit(1);
}

if (url.includes("your-project") || anonKey === "your-anon-key") {
  console.error("FAIL: .env.local still contains placeholder values.");
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const { error: authError } = await supabase.auth.getSession();
if (authError) {
  console.error("FAIL: Auth endpoint unreachable:", authError.message);
  process.exit(1);
}

const { error: dbError } = await supabase.from("profiles").select("id").limit(1);
if (dbError) {
  if (dbError.code === "PGRST205" || dbError.message.includes("does not exist")) {
    console.log("OK: Connected to Supabase, but the database schema is not applied yet.");
    console.log("     Run supabase/migrations/20260314000000_initial_schema.sql in the SQL editor.");
    process.exit(0);
  }
  console.error("FAIL: Database query failed:", dbError.message);
  process.exit(1);
}

console.log("OK: Successfully connected to Supabase and queried the profiles table.");

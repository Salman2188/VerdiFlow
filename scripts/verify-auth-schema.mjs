import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env.local");

if (!existsSync(envPath)) {
  console.error("FAIL: .env.local not found.");
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
  console.error("FAIL: Missing Supabase env vars in .env.local.");
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const checks = [
  {
    name: "workspaces table",
    run: () => supabase.from("workspaces").select("id").limit(1),
  },
  {
    name: "workspace_members table",
    run: () => supabase.from("workspace_members").select("workspace_id").limit(1),
  },
  {
    name: "user_onboarding table",
    run: () => supabase.from("user_onboarding").select("user_id").limit(1),
  },
];

for (const check of checks) {
  const { error } = await check.run();

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("does not exist")) {
      console.error(
        `FAIL: Missing ${check.name}. Run: node scripts/apply-auth-migration.mjs`,
      );
      process.exit(1);
    }

    console.error(`FAIL: ${check.name}:`, error.message);
    process.exit(1);
  }

  console.log(`OK: ${check.name}`);
}

console.log("OK: Auth schema is ready.");

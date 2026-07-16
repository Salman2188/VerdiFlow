import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const root = process.cwd();

function run(label, script) {
  console.log(`\n==> ${label}`);
  const result = spawnSync("node", [resolve(root, script)], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!process.env.SUPABASE_ACCESS_TOKEN && !process.env.DATABASE_URL) {
  console.error(
    "FAIL: Set SUPABASE_ACCESS_TOKEN or DATABASE_URL before running setup.\n" +
      "  Token: https://supabase.com/dashboard/account/tokens\n" +
      "  DB URL: Supabase → Project Settings → Database → Connection string (URI)",
  );
  process.exit(1);
}

if (process.env.SUPABASE_ACCESS_TOKEN) {
  run("Configure Supabase auth URLs", "scripts/configure-supabase-auth.mjs");
}

run("Apply migrations", "scripts/apply-migrations.mjs");
run("Verify auth schema", "scripts/verify-auth-schema.mjs");

console.log("\nOK: Auth production setup complete.");

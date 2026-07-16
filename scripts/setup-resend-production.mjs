/**
 * One-shot production email setup: DNS → Supabase SMTP → verify delivery.
 *
 * Required in .env.local:
 *   CLOUDFLARE_API_TOKEN
 *   SUPABASE_ACCESS_TOKEN
 *   RESEND_API_KEY
 *
 * Optional:
 *   SMTP_ADMIN_EMAIL=auth@mail.verdiflow.com
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const root = process.cwd();
const required = ["CLOUDFLARE_API_TOKEN", "SUPABASE_ACCESS_TOKEN", "RESEND_API_KEY"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `FAIL: Add to .env.local:\n${missing.map((k) => `  ${k}=...`).join("\n")}\n\n` +
      "  CLOUDFLARE_API_TOKEN: Cloudflare → My Profile → API Tokens → Edit zone DNS (verdiflow.com)\n" +
      "  SUPABASE_ACCESS_TOKEN: https://supabase.com/dashboard/account/tokens\n" +
      "  RESEND_API_KEY: https://resend.com/api-keys",
  );
  process.exit(1);
}

function run(label, script) {
  console.log(`\n==> ${label}`);
  const result = spawnSync("node", [resolve(root, script)], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      SMTP_ADMIN_EMAIL: process.env.SMTP_ADMIN_EMAIL ?? "auth@mail.verdiflow.com",
    },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("Add Resend DNS records to Cloudflare", "scripts/configure-resend-dns.mjs");
run("Configure Supabase SMTP + rate limits", "scripts/configure-supabase-smtp.mjs");

console.log("\nWaiting 30s for DNS propagation before domain verification...");
await new Promise((r) => setTimeout(r, 30_000));

const domainId = process.env.RESEND_DOMAIN_ID ?? "ccb09276-1516-4568-9788-59c95eb7b785";
const verify = await fetch(`https://api.resend.com/domains/${domainId}/verify`, {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
});
const verifyBody = await verify.text();
console.log("\nResend domain verify:", verify.status, verifyBody);

run("Test auth email delivery", "scripts/test-auth-email.mjs");

console.log("\nOK: Production email setup complete.");

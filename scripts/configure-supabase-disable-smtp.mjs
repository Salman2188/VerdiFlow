/**
 * Revert Supabase Auth to the built-in email provider (disable custom SMTP).
 *
 * Requires SUPABASE_ACCESS_TOKEN in .env.local
 * Create at: https://supabase.com/dashboard/account/tokens
 */

import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const projectRef = "afyvzntrdqdjqrtpqksm";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "FAIL: Set SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens",
  );
  process.exit(1);
}

const payload = {
  smtp_host: "",
  smtp_port: 587,
  smtp_user: "",
  smtp_pass: "",
  smtp_admin_email: "",
  smtp_sender_name: "",
};

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const body = await response.text();

if (!response.ok) {
  console.error("FAIL:", body);
  process.exit(1);
}

const config = JSON.parse(body);

console.log("OK: Disabled custom SMTP. Supabase will use built-in email.");
console.log(
  JSON.stringify(
    {
      smtp_host: config.smtp_host ?? null,
      smtp_admin_email: config.smtp_admin_email ?? null,
      rate_limit_email_sent: config.rate_limit_email_sent ?? null,
    },
    null,
    2,
  ),
);

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

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const body = await response.text();

if (!response.ok) {
  console.error("FAIL:", body);
  process.exit(1);
}

const config = JSON.parse(body);
const smtpConfigured = Boolean(config.smtp_host && config.smtp_user);

console.log("Auth email configuration:");
console.log(JSON.stringify(
  {
    smtp_configured: smtpConfigured,
    smtp_host: config.smtp_host ?? null,
    rate_limit_email_sent: config.rate_limit_email_sent ?? null,
    rate_limit_signup: config.rate_limit_signup ?? null,
    rate_limit_recovery: config.rate_limit_recovery ?? null,
    site_url: config.site_url ?? null,
  },
  null,
  2,
));

if (!smtpConfigured) {
  console.log(
    "\nNOTE: Built-in Supabase email is limited to 2 auth emails/hour project-wide.\n" +
      "Custom SMTP can be configured later after you own a sending domain:\n" +
      "https://supabase.com/dashboard/project/" +
      projectRef +
      "/auth/smtp",
  );
}

import { loadProjectEnv } from "./load-env.mjs";
import { getAuthConfigPayload, PRODUCTION_APP_URL } from "./auth-redirects.mjs";

loadProjectEnv();

const projectRef = "afyvzntrdqdjqrtpqksm";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? PRODUCTION_APP_URL;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

const resendApiKey = process.env.RESEND_API_KEY;
const smtpHost = process.env.SMTP_HOST ?? "smtp.resend.com";
const smtpPort = Number(process.env.SMTP_PORT ?? 465);
const smtpUser = process.env.SMTP_USER ?? "resend";
const smtpPass = process.env.SMTP_PASS ?? resendApiKey;
const smtpAdminEmail = process.env.SMTP_ADMIN_EMAIL ?? process.env.AUTH_FROM_EMAIL;
const smtpSenderName = process.env.SMTP_SENDER_NAME ?? "VerdiFlow";
const emailRateLimit = Number(process.env.AUTH_EMAIL_RATE_LIMIT ?? 100);

if (!accessToken) {
  console.error(
    "FAIL: Set SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens",
  );
  process.exit(1);
}

if (!smtpPass || !smtpAdminEmail) {
  console.error(
    "FAIL: Set RESEND_API_KEY (or SMTP_PASS) and SMTP_ADMIN_EMAIL (verified sender, e.g. auth@yourdomain.com).",
  );
  process.exit(1);
}

const payload = {
  external_email_enabled: true,
  mailer_secure_email_change_enabled: true,
  mailer_autoconfirm: false,
  smtp_host: smtpHost,
  smtp_port: smtpPort,
  smtp_user: smtpUser,
  smtp_pass: smtpPass,
  smtp_admin_email: smtpAdminEmail,
  smtp_sender_name: smtpSenderName,
  ...getAuthConfigPayload(appUrl.replace(/\/$/, "")),
  rate_limit_email_sent: emailRateLimit,
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

console.log("OK: Configured Supabase Auth email delivery.");
console.log(
  JSON.stringify(
    {
      smtp_host: config.smtp_host,
      smtp_admin_email: config.smtp_admin_email,
      smtp_sender_name: config.smtp_sender_name,
      site_url: config.site_url,
      rate_limit_email_sent: config.rate_limit_email_sent,
    },
    null,
    2,
  ),
);

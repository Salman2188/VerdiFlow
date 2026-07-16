import { createClient } from "@supabase/supabase-js";
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://verdiflowai.vercel.app";

if (!url || !anonKey) {
  console.error("FAIL: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const email = process.env.TEST_EMAIL ?? `vfemailtest${Date.now()}@mailinator.com`;
const redirectTo = `${appUrl}/auth/callback?next=/onboarding/connect-instagram`;

const supabase = createClient(url, anonKey);

console.log("Testing auth email delivery");
console.log({ url, appUrl, email, redirectTo });

const signup = await supabase.auth.signUp({
  email,
  password: "TestPass123!",
  options: {
    data: { full_name: "Email Delivery Test" },
    emailRedirectTo: redirectTo,
  },
});

console.log("\n=== SIGNUP ===");
console.log({
  error: signup.error?.message ?? null,
  status: signup.error?.status ?? null,
  userId: signup.data.user?.id ?? null,
  confirmed: signup.data.user?.email_confirmed_at ?? null,
  identities: signup.data.user?.identities?.length ?? 0,
  hasSession: Boolean(signup.data.session),
});

if (signup.error) {
  process.exit(1);
}

await new Promise((resolve) => setTimeout(resolve, 2000));

const resend = await supabase.auth.resend({
  type: "signup",
  email,
  options: { emailRedirectTo: redirectTo },
});

console.log("\n=== RESEND ===");
console.log({
  error: resend.error?.message ?? null,
  status: resend.error?.status ?? null,
  data: resend.data,
});

if (resend.error) {
  process.exit(1);
}

const inbox = email.split("@")[0];
const mailinator = await fetch(
  `https://mailinator.com/api/v2/domains/public/inboxes/${inbox}`,
).then((r) => r.json());

console.log("\n=== MAILINATOR INBOX ===");
console.log({
  inbox,
  messageCount: mailinator.msgs?.length ?? 0,
  subjects: mailinator.msgs?.map((m) => m.subject) ?? [],
});

if (!mailinator.msgs?.length) {
  console.error("\nFAIL: No verification email received in Mailinator within 2s.");
  console.error("Likely causes: Supabase built-in email rate limit (2/hour) or SMTP not configured.");
  process.exit(1);
}

console.log("\nOK: Verification email delivered.");
console.log(`Check inbox: https://www.mailinator.com/v4/public/inboxes.jsp?to=${inbox}`);

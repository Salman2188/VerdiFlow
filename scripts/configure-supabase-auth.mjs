const projectRef = "afyvzntrdqdjqrtpqksm";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://verdiflowai.vercel.app";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "FAIL: Set SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens",
  );
  process.exit(1);
}

const payload = {
  site_url: appUrl,
  uri_allow_list: [
    `${appUrl}/auth/callback`,
    `${appUrl}/auth/callback/**`,
    `${appUrl}/reset-password`,
    `${appUrl}/onboarding/connect-instagram`,
    "http://localhost:3000/auth/callback",
    "http://localhost:3000/auth/callback/**",
    "http://localhost:3000/reset-password",
  ].join(","),
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

console.log("OK: Updated Supabase auth URLs.");
console.log(JSON.stringify({ site_url: appUrl }, null, 2));

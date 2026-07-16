import { loadProjectEnv } from "./load-env.mjs";
import { getAuthConfigPayload, PRODUCTION_APP_URL } from "./auth-redirects.mjs";

loadProjectEnv();

const projectRef = "afyvzntrdqdjqrtpqksm";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? PRODUCTION_APP_URL;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "FAIL: Set SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens",
  );
  process.exit(1);
}

const payload = getAuthConfigPayload(appUrl.replace(/\/$/, ""));

const getResponse = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

if (getResponse.ok) {
  const current = await getResponse.json();
  console.log("Current Supabase auth URLs:");
  console.log(
    JSON.stringify(
      {
        site_url: current.site_url ?? null,
        uri_allow_list: current.uri_allow_list ?? null,
      },
      null,
      2,
    ),
  );
}

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

console.log("OK: Updated Supabase auth URLs.");
console.log(
  JSON.stringify(
    {
      site_url: config.site_url,
      uri_allow_list: config.uri_allow_list,
    },
    null,
    2,
  ),
);

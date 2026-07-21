/**
 * End-to-end local proof: login -> skip onboarding -> dashboard + pipeline.
 *
 * Usage:
 *   node scripts/prove-local-flow.mjs
 *
 * Requires .env.local and TEST_AUTH_EMAIL / TEST_AUTH_PASSWORD.
 */

import { createServerClient } from "@supabase/ssr";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = process.env.PROOF_BASE_URL ?? "http://localhost:3000";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    throw new Error(".env.local not found");
  }

  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const idx = line.indexOf("=");
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
      }),
  );
}

function createCookieStore() {
  /** @type {{ name: string; value: string }[]} */
  const jar = [];

  return {
    getAll() {
      return jar;
    },
    setAll(cookiesToSet) {
      for (const cookie of cookiesToSet) {
        const index = jar.findIndex((item) => item.name === cookie.name);
        if (index >= 0) {
          jar[index] = { name: cookie.name, value: cookie.value };
        } else {
          jar.push({ name: cookie.name, value: cookie.value });
        }
      }
    },
    header() {
      return jar.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
    },
  };
}

async function fetchWithCookies(path, cookieStore, init = {}) {
  const headers = new Headers(init.headers ?? {});
  const cookieHeader = cookieStore.header();
  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  return fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
    redirect: "manual",
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`ASSERT FAIL: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const email = process.env.TEST_AUTH_EMAIL;
const password = process.env.TEST_AUTH_PASSWORD;

if (!url || !anonKey) {
  throw new Error("Missing Supabase env vars in .env.local");
}

if (!email || !password) {
  throw new Error("Set TEST_AUTH_EMAIL and TEST_AUTH_PASSWORD");
}

console.log("=== STEP 0: Health check ===");
const health = await fetch(`${BASE_URL}/login`);
assert(health.status === 200, `Local app reachable at ${BASE_URL}/login (${health.status})`);

console.log("\n=== STEP 1: Login via Supabase (same client pattern as app) ===");
const cookieStore = createCookieStore();
const supabase = createServerClient(url, anonKey, {
  cookies: {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      cookieStore.setAll(cookiesToSet);
    },
  },
});

const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (signInError) {
  throw new Error(`signInWithPassword failed: ${signInError.message}`);
}

await supabase.auth.getUser();
await supabase.auth.getSession();

assert(Boolean(signInData.session), "Session exists immediately after login");
assert(cookieStore.getAll().length > 0, `Auth cookies written (${cookieStore.getAll().length} cookie(s))`);
console.log("Cookies:", cookieStore.getAll().map((c) => c.name).join(", "));

console.log("\n=== STEP 2: Onboarding page accessible with session ===");
const onboardingGet = await fetchWithCookies("/onboarding/connect-instagram", cookieStore);
const onboardingHtml = await onboardingGet.text();
assert(
  onboardingGet.status === 200,
  `GET /onboarding/connect-instagram returns 200 (got ${onboardingGet.status})`,
);
assert(
  onboardingHtml.includes('action="/api/onboarding/skip"'),
  'Onboarding page uses POST /api/onboarding/skip form',
);
assert(
  onboardingHtml.includes("Skip for now"),
  "Onboarding page renders Skip for now",
);

console.log("\n=== STEP 3: Skip for now -> Dashboard ===");
const skipPost = await fetchWithCookies("/api/onboarding/skip", cookieStore, { method: "POST" });
const skipLocation = skipPost.headers.get("location") ?? "";
assert(
  skipPost.status === 307 || skipPost.status === 302,
  `POST /api/onboarding/skip redirects (${skipPost.status})`,
);
assert(
  skipLocation.includes("/dashboard"),
  `Skip redirect target is dashboard (${skipLocation})`,
);

console.log("\n=== STEP 4: Dashboard is new version ===");
const dashboardGet = await fetchWithCookies("/dashboard", cookieStore);
const dashboardHtml = await dashboardGet.text();
assert(dashboardGet.status === 200, `GET /dashboard returns 200 (got ${dashboardGet.status})`);
assert(dashboardHtml.includes("Nøkkeltall"), "Dashboard contains new KPI section title 'Nøkkeltall'");
assert(!dashboardHtml.includes("TopNavSearch"), "Dashboard does NOT contain removed TopNavSearch component");
assert(dashboardHtml.includes("Pipeline"), "Dashboard contains Pipeline preview section");

console.log("\n=== STEP 5: Pipeline page is new version ===");
const pipelineGet = await fetchWithCookies("/dashboard/pipeline", cookieStore);
const pipelineHtml = await pipelineGet.text();
assert(pipelineGet.status === 200, `GET /dashboard/pipeline returns 200 (got ${pipelineGet.status})`);
assert(
  pipelineHtml.includes("Søk navn eller eiendom"),
  "Pipeline contains new search placeholder 'Søk navn eller eiendom'",
);
assert(!pipelineHtml.includes("Salgsprosess"), "Pipeline does NOT contain old glass header label 'Salgsprosess'");

const protectedRoutes = [
  { path: "/dashboard/leads", marker: "Totalt leads" },
  { path: "/dashboard/analytics", marker: "Analytics" },
  { path: "/dashboard/ai", marker: "AI Assistent" },
  { path: "/dashboard/settings", marker: "Settings" },
];

console.log("\n=== STEP 6: Session persists across all protected routes ===");
for (const route of protectedRoutes) {
  const response = await fetchWithCookies(route.path, cookieStore);
  const html = await response.text();
  assert(
    response.status === 200,
    `GET ${route.path} returns 200 with active session (got ${response.status}, location=${response.headers.get("location") ?? "none"})`,
  );
  assert(
    !html.includes("Welcome back"),
    `${route.path} does NOT redirect to login page`,
  );
  assert(
    html.includes(route.marker),
    `${route.path} renders expected workspace content (${route.marker})`,
  );
}

console.log("\n=== STEP 7: Revisit pipeline after full navigation ===");
const pipelineAgain = await fetchWithCookies("/dashboard/pipeline", cookieStore);
const pipelineAgainHtml = await pipelineAgain.text();
assert(
  pipelineAgain.status === 200,
  `GET /dashboard/pipeline again returns 200 (got ${pipelineAgain.status})`,
);
assert(
  !pipelineAgainHtml.includes("Welcome back"),
  "Pipeline revisit does NOT redirect to login page",
);

console.log("\n=== ALL LOCAL PROOF CHECKS PASSED ===");

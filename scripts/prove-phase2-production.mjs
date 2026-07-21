/**
 * Verify Phase 2 UX markers on production (authenticated).
 * Usage: TEST_AUTH_EMAIL=... TEST_AUTH_PASSWORD=... node scripts/prove-phase2-production.mjs
 */

import { createServerClient } from "@supabase/ssr";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = process.env.PROOF_BASE_URL ?? "https://verdiflowai.vercel.app";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(`ASSERT FAIL: ${message}`);
  }
  console.log(`PASS: ${message}`);
}

const env = loadEnv();
const email = process.env.TEST_AUTH_EMAIL;
const password = process.env.TEST_AUTH_PASSWORD;

if (!email || !password) {
  throw new Error("Set TEST_AUTH_EMAIL and TEST_AUTH_PASSWORD");
}

const cookieStore = createCookieStore();
const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  cookies: cookieStore,
});

const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
if (signInError) {
  throw new Error(`signInWithPassword failed: ${signInError.message}`);
}

await supabase.auth.getSession();

async function fetchAuthed(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { cookie: cookieStore.header() },
    redirect: "manual",
  });
  const html = response.status === 200 ? await response.text() : "";
  return { status: response.status, location: response.headers.get("location"), html };
}

console.log("=== Phase 2 production marker checks ===");

const dashboard = await fetchAuthed("/dashboard");
assert(dashboard.status === 200, "Dashboard returns 200 when authenticated");
assert(dashboard.html.includes("Dagens fokus"), "Dashboard contains focus tasks section");
assert(dashboard.html.includes("/dashboard/leads/lead-1"), "Dashboard focus card links to lead-1");

const leadDetail = await fetchAuthed("/dashboard/leads/lead-1");
assert(leadDetail.status === 200, "Lead Intelligence page returns 200");
assert(leadDetail.html.includes("Lead Intelligence"), "Lead Intelligence label present");
assert(leadDetail.html.includes("Jennifer Walsh"), "Lead detail shows customer name");

const pipeline = await fetchAuthed("/dashboard/pipeline");
assert(pipeline.status === 200, "Pipeline returns 200");
assert(pipeline.html.includes("Søk navn eller eiendom"), "Pipeline search present");

console.log("\n=== ALL PHASE 2 PRODUCTION MARKERS PASSED ===");

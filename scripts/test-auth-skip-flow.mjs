/**
 * Verifies login session persistence and onboarding skip prerequisites.
 *
 * Usage:
 *   TEST_AUTH_EMAIL=you@example.com TEST_AUTH_PASSWORD='secret' node scripts/test-auth-skip-flow.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env.local");

if (!existsSync(envPath)) {
  console.error("FAIL: .env.local not found.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const email = process.env.TEST_AUTH_EMAIL;
const password = process.env.TEST_AUTH_PASSWORD;

if (!url || !anonKey) {
  console.error("FAIL: Missing Supabase env vars.");
  process.exit(1);
}

if (!email || !password) {
  console.error("SKIP: Set TEST_AUTH_EMAIL and TEST_AUTH_PASSWORD to run live auth verification.");
  process.exit(0);
}

const supabase = createClient(url, anonKey);

const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (signInError) {
  console.error("FAIL: signInWithPassword:", signInError.message);
  process.exit(1);
}

const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
if (sessionError || !sessionData.session) {
  console.error("FAIL: No session immediately after login.", sessionError?.message ?? "missing session");
  process.exit(1);
}

const { data: userData, error: userError } = await supabase.auth.getUser();
if (userError || !userData.user) {
  console.error("FAIL: getUser failed after login.", userError?.message ?? "missing user");
  process.exit(1);
}

const userId = userData.user.id;

const { data: onboarding, error: onboardingError } = await supabase
  .from("user_onboarding")
  .select("current_step")
  .eq("user_id", userId)
  .maybeSingle();

if (onboardingError) {
  console.error("FAIL: Could not read user_onboarding:", onboardingError.message);
  process.exit(1);
}

console.log("OK: Session established after login.");
console.log(`OK: Authenticated user ${userId}`);
console.log(`OK: Onboarding step = ${onboarding?.current_step ?? "none"}`);

if (onboarding?.current_step === "connect_instagram") {
  const { error: updateError } = await supabase
    .from("user_onboarding")
    .update({
      current_step: "completed",
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (updateError) {
    console.error("FAIL: Could not complete onboarding skip update:", updateError.message);
    process.exit(1);
  }

  await supabase
    .from("user_onboarding")
    .update({
      current_step: "connect_instagram",
      onboarding_completed_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  console.log("OK: Onboarding skip update succeeded (restored connect_instagram for manual UI test).");
}

console.log("PASS: Auth skip flow prerequisites verified.");

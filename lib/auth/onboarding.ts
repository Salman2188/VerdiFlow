import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { OnboardingStep, UserOnboardingRow } from "@/types/database";

export async function getOnboardingState(userId: string): Promise<UserOnboardingRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function syncEmailVerificationStep(userId: string, verifiedAt: string) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_onboarding")
    .select("current_step, email_verified_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing?.email_verified_at) {
    return existing;
  }

  const nextStep: OnboardingStep =
    existing?.current_step === "completed" ? "completed" : "connect_instagram";

  const { data, error } = await supabase
    .from("user_onboarding")
    .update({
      email_verified_at: verifiedAt,
      current_step: nextStep,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function ensureOnboardingRow(userId: string) {
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("user_onboarding")
    .insert({ user_id: userId, current_step: "verify_email" })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

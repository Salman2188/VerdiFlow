import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { OnboardingStep, UserOnboardingRow } from "@/types/database";

function isMissingOnboardingTable(error: { code?: string; message?: string }) {
  return error.code === "PGRST205" || Boolean(error.message?.includes("does not exist"));
}

export async function getOnboardingState(userId: string): Promise<UserOnboardingRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingOnboardingTable(error)) {
      return null;
    }

    throw error;
  }

  return data;
}

export async function syncEmailVerificationStep(userId: string, verifiedAt: string) {
  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("user_onboarding")
    .select("current_step, email_verified_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingError) {
    if (isMissingOnboardingTable(existingError)) {
      return null;
    }

    throw existingError;
  }

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
    if (isMissingOnboardingTable(error)) {
      return null;
    }

    throw error;
  }

  return data;
}

export async function ensureOnboardingRow(userId: string) {
  const supabase = await createClient();
  const { data: existing, error: existingError } = await supabase
    .from("user_onboarding")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingError) {
    if (isMissingOnboardingTable(existingError)) {
      return null;
    }

    throw existingError;
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("user_onboarding")
    .insert({ user_id: userId, current_step: "verify_email" })
    .select("*")
    .single();

  if (error) {
    if (isMissingOnboardingTable(error)) {
      return null;
    }

    throw error;
  }

  return data;
}

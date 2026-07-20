import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import {
  ensureOnboardingRow,
  completeInstagramOnboarding,
} from "@/lib/auth/onboarding";
import type { Database } from "@/types/database";

export async function skipOnboardingForUser(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  await ensureOnboardingRow(userId);
  await completeInstagramOnboarding(userId, supabase);
}

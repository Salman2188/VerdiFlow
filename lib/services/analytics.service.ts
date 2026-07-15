import "server-only";

import { buildAnalyticsData } from "@/lib/mappers/analytics";
import type { AnalyticsData } from "@/components/dashboard/analytics";

import { createServerSupabase } from "./server-supabase";

export async function getAnalytics(): Promise<AnalyticsData> {
  const supabase = await createServerSupabase();

  const [leadsResult, profilesResult, activitiesResult] = await Promise.all([
    supabase.from("leads").select("*"),
    supabase.from("profiles").select("*"),
    supabase.from("activities").select("id", { count: "exact", head: true }),
  ]);

  if (leadsResult.error) {
    throw leadsResult.error;
  }

  if (profilesResult.error) {
    throw profilesResult.error;
  }

  if (activitiesResult.error) {
    throw activitiesResult.error;
  }

  return buildAnalyticsData(
    leadsResult.data ?? [],
    profilesResult.data ?? [],
    activitiesResult.count ?? 0,
  );
}

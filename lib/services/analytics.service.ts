import { buildAnalyticsData } from "@/lib/mappers/analytics";
import { getSupabaseClient } from "@/lib/supabase/get-client";
import type { AnalyticsData } from "@/components/dashboard/analytics";

export async function getAnalytics(): Promise<AnalyticsData> {
  const supabase = getSupabaseClient();

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

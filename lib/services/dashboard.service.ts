import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";
import {
  buildDashboardInsights,
  buildDashboardKpis,
  buildDashboardPipelinePreview,
} from "@/lib/mappers/analytics";

import type { LeadRow } from "@/types/database";
import type { AiInsight } from "@/components/dashboard/insights";
import type { KpiMetric } from "@/components/dashboard/kpi";
import type { PipelineStage } from "@/components/dashboard/pipeline";

async function fetchDashboardSourceData(): Promise<LeadRow[]> {
  if (!hasSupabaseEnv()) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getDashboardKpis(): Promise<KpiMetric[]> {
  const leads = await fetchDashboardSourceData();
  return buildDashboardKpis(leads);
}

export async function getDashboardPipelinePreview(): Promise<PipelineStage[]> {
  const leads = await fetchDashboardSourceData();
  return buildDashboardPipelinePreview(leads);
}

export async function getDashboardInsights(): Promise<AiInsight[]> {
  const leads = await fetchDashboardSourceData();
  return buildDashboardInsights(leads);
}

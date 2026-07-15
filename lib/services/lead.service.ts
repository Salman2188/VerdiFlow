import "server-only";

import type { LeadDetail } from "@/components/dashboard/lead-detail";
import type { Lead } from "@/components/dashboard/leads";
import { mapLeadDetail, mapLeadRow } from "@/lib/mappers/lead";

import { createServerSupabase } from "./server-supabase";

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("ai_priority_score", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapLeadRow);
}

export async function getLeadDetail(id: string): Promise<LeadDetail | null> {
  const supabase = await createServerSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (leadError) {
    throw leadError;
  }

  if (!lead) {
    return null;
  }

  const [notesResult, tasksResult, activitiesResult] = await Promise.all([
    supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("lead_tasks")
      .select("*")
      .eq("lead_id", id)
      .order("completed", { ascending: true })
      .order("due_date", { ascending: true }),
    supabase
      .from("activities")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (notesResult.error) {
    throw notesResult.error;
  }

  if (tasksResult.error) {
    throw tasksResult.error;
  }

  if (activitiesResult.error) {
    throw activitiesResult.error;
  }

  return mapLeadDetail(
    lead,
    notesResult.data ?? [],
    tasksResult.data ?? [],
    activitiesResult.data ?? [],
  );
}

import "server-only";

import { mapKanbanLead } from "@/lib/mappers/lead";
import type { KanbanBoard, KanbanColumnId } from "@/components/dashboard/pipeline-board";

import { createServerSupabase } from "./server-supabase";

export async function getPipelineBoard(): Promise<KanbanBoard> {
  const supabase = await createServerSupabase();

  const [stagesResult, leadsResult] = await Promise.all([
    supabase.from("pipeline_stages").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("leads")
      .select("*")
      .order("ai_priority_score", { ascending: false }),
  ]);

  if (stagesResult.error) {
    throw stagesResult.error;
  }

  if (leadsResult.error) {
    throw leadsResult.error;
  }

  const stages = stagesResult.data ?? [];
  const leads = leadsResult.data ?? [];

  return {
    columns: stages.map((stage) => ({
      id: stage.id as KanbanColumnId,
      label: stage.label,
      emoji: stage.emoji,
      leads: leads
        .filter((lead) => lead.pipeline_stage_id === stage.id)
        .map(mapKanbanLead),
    })),
  };
}

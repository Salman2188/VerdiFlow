import { mapKanbanLead } from "@/lib/mappers/lead";
import { getSupabaseClient } from "@/lib/supabase/get-client";
import type { KanbanBoard, KanbanColumnId } from "@/components/dashboard/pipeline-board";

export async function getPipelineBoard(): Promise<KanbanBoard> {
  const supabase = getSupabaseClient();

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

export async function updateLeadColumn(
  leadId: string,
  columnId: KanbanColumnId,
): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("leads")
    .update({
      pipeline_stage_id: columnId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    throw error;
  }
}

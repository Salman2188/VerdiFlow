import { getSupabaseClient } from "@/lib/supabase/get-client";
import type { KanbanColumnId } from "@/components/dashboard/pipeline-board";

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

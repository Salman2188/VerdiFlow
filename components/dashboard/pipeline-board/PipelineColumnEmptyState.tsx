import { Sparkles } from "lucide-react";

import { dashboardAiHighlight } from "@/components/dashboard/dashboard-styles";

import { getPipelineColumnEmptySuggestion } from "./pipeline-column-empty";
import type { KanbanColumnId } from "./types";

type PipelineColumnEmptyStateProps = {
  columnId: KanbanColumnId;
  isDropTarget: boolean;
};

export function PipelineColumnEmptyState({
  columnId,
  isDropTarget,
}: PipelineColumnEmptyStateProps) {
  const { title, suggestion } = getPipelineColumnEmptySuggestion(columnId);

  if (isDropTarget) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-emerald-500/30 bg-emerald-500/[0.04] px-3 py-8 text-center">
        <p className="text-xs font-medium text-emerald-400/80">Slipp lead her</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-zinc-800 px-3 py-6 text-center">
      <p className="text-xs font-medium text-zinc-500">{title}</p>
      <div className={`mt-3 px-3 py-2.5 text-left ${dashboardAiHighlight}`}>
        <p className="flex items-start gap-2 text-[11px] leading-5 text-emerald-200/65">
          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/60" strokeWidth={1.75} />
          <span>{suggestion}</span>
        </p>
      </div>
    </div>
  );
}

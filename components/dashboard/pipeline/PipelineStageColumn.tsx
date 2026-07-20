import type { PipelineStage, PipelineStageId } from "./types";
import { PipelineLeadCard } from "./PipelineLeadCard";

const STAGE_DOT: Record<PipelineStageId, string> = {
  hot: "bg-rose-400",
  warm: "bg-amber-400",
  active: "bg-emerald-400",
  new: "bg-zinc-500",
};

type PipelineStageColumnProps = {
  stage: PipelineStage;
};

export function PipelineStageColumn({ stage }: PipelineStageColumnProps) {
  return (
    <div className="flex min-w-[16rem] flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${STAGE_DOT[stage.id]}`}
            aria-hidden="true"
          />
          <h3 className="text-sm font-medium text-zinc-200">{stage.label}</h3>
        </div>
        <span className="text-xs font-medium tabular-nums text-zinc-500">{stage.leads.length}</span>
      </div>

      <div className="flex flex-col gap-2">
        {stage.leads.map((lead) => (
          <PipelineLeadCard key={lead.id} lead={lead} stageId={stage.id} />
        ))}
      </div>
    </div>
  );
}

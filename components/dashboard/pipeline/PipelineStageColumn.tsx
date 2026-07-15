import { PipelineLeadCard } from "./PipelineLeadCard";
import type { PipelineStage } from "./types";

type PipelineStageColumnProps = {
  stage: PipelineStage;
};

export function PipelineStageColumn({ stage }: PipelineStageColumnProps) {
  return (
    <div className="flex min-w-[17rem] flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm" aria-hidden="true">
            {stage.emoji}
          </span>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-white">
            {stage.label}
          </h3>
        </div>
        <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium tabular-nums text-zinc-500">
          {stage.leads.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {stage.leads.map((lead) => (
          <PipelineLeadCard key={lead.id} lead={lead} stageId={stage.id} />
        ))}
      </div>
    </div>
  );
}

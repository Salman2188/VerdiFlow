import { Clock, Home, Sparkles } from "lucide-react";

import type { PipelineLead, PipelineStageId } from "./types";

const STAGE_ACCENT: Record<
  PipelineStageId,
  { badge: string; probability: string; border: string }
> = {
  hot: {
    badge: "bg-rose-500/15 text-rose-300/90 border-rose-500/15",
    probability: "text-emerald-400",
    border: "hover:border-rose-500/10",
  },
  warm: {
    badge: "bg-amber-500/12 text-amber-300/85 border-amber-500/12",
    probability: "text-emerald-400/90",
    border: "hover:border-amber-500/10",
  },
  active: {
    badge: "bg-emerald-500/12 text-emerald-300/85 border-emerald-500/12",
    probability: "text-emerald-400/85",
    border: "hover:border-emerald-500/10",
  },
  new: {
    badge: "bg-zinc-500/12 text-zinc-300/80 border-zinc-500/12",
    probability: "text-zinc-400",
    border: "hover:border-white/[0.08]",
  },
};

const PRIORITY_STYLE: Record<PipelineLead["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

type PipelineLeadCardProps = {
  lead: PipelineLead;
  stageId: PipelineStageId;
};

export function PipelineLeadCard({ lead, stageId }: PipelineLeadCardProps) {
  const accent = STAGE_ACCENT[stageId];

  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 shadow-[0_2px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white/[0.03] hover:shadow-[0_6px_24px_rgba(0,0,0,0.24)] ${accent.border}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold tracking-[-0.01em] text-white">
            {lead.customerName}
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] text-zinc-500">
            <Home className="h-3 w-3 shrink-0" strokeWidth={1.75} />
            {lead.property}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${PRIORITY_STYLE[lead.priority]}`}
        >
          {lead.priority}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${accent.badge}`}>
          {lead.status}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-zinc-600">
          <Clock className="h-3 w-3" strokeWidth={1.75} />
          {lead.lastActivity}
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-emerald-500/[0.08] bg-emerald-500/[0.04] px-3 py-2.5">
        <p className="flex items-start gap-1.5 text-[11px] leading-[1.6] text-emerald-200/70">
          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/60" strokeWidth={1.75} />
          {lead.aiRecommendation}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-zinc-600">Lukkingssannsynlighet</span>
        <span className={`text-[12px] font-semibold tabular-nums ${accent.probability}`}>
          {lead.closingProbability}%
        </span>
      </div>
    </article>
  );
}

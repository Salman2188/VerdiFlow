import { Clock, Home } from "lucide-react";

import { dashboardCardPadding, dashboardCardStatic } from "@/components/dashboard/dashboard-styles";

import type { PipelineLead, PipelineStageId } from "./types";

const STAGE_ACCENT: Record<PipelineStageId, string> = {
  hot: "border-l-rose-500/50",
  warm: "border-l-amber-500/40",
  active: "border-l-emerald-500/40",
  new: "border-l-zinc-700",
};

const PRIORITY_STYLE: Record<PipelineLead["priority"], string> = {
  Høy: "text-emerald-400",
  Medium: "text-zinc-400",
  Lav: "text-zinc-500",
};

type PipelineLeadCardProps = {
  lead: PipelineLead;
  stageId: PipelineStageId;
};

export function PipelineLeadCard({ lead, stageId }: PipelineLeadCardProps) {
  return (
    <article
      className={`border-l-2 ${STAGE_ACCENT[stageId]} ${dashboardCardStatic} ${dashboardCardPadding}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100">{lead.customerName}</p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-500">
            <Home className="h-3 w-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {lead.property}
          </p>
        </div>
        <span className={`shrink-0 text-[11px] font-medium ${PRIORITY_STYLE[lead.priority]}`}>
          {lead.priority}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-zinc-500">
        <span>{lead.status}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
          {lead.lastActivity}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-400">{lead.aiRecommendation}</p>

      <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-3 text-xs">
        <span className="text-zinc-500">Lukkingssannsynlighet</span>
        <span className="font-medium tabular-nums text-zinc-200">{lead.closingProbability}%</span>
      </div>
    </article>
  );
}

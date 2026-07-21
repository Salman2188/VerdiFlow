import { TrendingUp } from "lucide-react";

import {
  dashboardInteractiveCard,
  dashboardProgressTrack,
  dashboardStatTile,
} from "@/components/dashboard/dashboard-styles";
import { LeadPriorityScore } from "@/components/dashboard/leads/LeadPriorityScore";

import { DetailSection } from "./DetailSection";
import type { Lead } from "@/components/dashboard/leads";

type LeadDetailMetricsProps = {
  lead: Lead;
};

export function LeadDetailMetrics({ lead }: LeadDetailMetricsProps) {
  const probabilityColor =
    lead.closingProbability >= 60
      ? "text-emerald-400"
      : lead.closingProbability >= 35
        ? "text-amber-400"
        : "text-zinc-400";

  return (
    <DetailSection
      title="Nøkkeltall"
      subtitle="AI-vurdert sannsynlighet"
      icon={<TrendingUp className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className={`${dashboardStatTile} flex flex-col items-center`}>
          <LeadPriorityScore score={lead.aiPriorityScore} size="lg" showLabel />
          <p className="mt-2 text-[10px] font-medium text-zinc-600">AI Priority</p>
        </div>

        <div className={`${dashboardStatTile} flex flex-col items-center justify-center`}>
          <p className={`text-2xl font-semibold tabular-nums tracking-[-0.03em] ${probabilityColor}`}>
            {lead.closingProbability}%
          </p>
          <p className="mt-1 text-[10px] font-medium text-zinc-600">Lukkingssannsynlighet</p>
          <div className={`mt-3 w-full ${dashboardProgressTrack}`}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                lead.closingProbability >= 60
                  ? "bg-emerald-400"
                  : lead.closingProbability >= 35
                    ? "bg-amber-400"
                    : "bg-zinc-500"
              }`}
              style={{ width: `${lead.closingProbability}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className={`${dashboardInteractiveCard} px-3 py-2.5`}>
          <p className="text-[10px] text-zinc-600">Siste aktivitet</p>
          <p className="mt-0.5 text-xs font-medium text-zinc-300">{lead.lastActivity}</p>
        </div>
        <div className={`${dashboardInteractiveCard} px-3 py-2.5`}>
          <p className="text-[10px] text-zinc-600">Kilde</p>
          <p className="mt-0.5 text-xs font-medium text-zinc-300">{lead.source}</p>
        </div>
      </div>
    </DetailSection>
  );
}

import { TrendingUp } from "lucide-react";

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
        ? "text-amber-400/90"
        : "text-zinc-400";

  return (
    <DetailSection
      title="Nøkkeltall"
      subtitle="AI-vurdert sannsynlighet"
      icon={<TrendingUp className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center rounded-xl border border-white/[0.04] bg-black/15 p-4">
          <LeadPriorityScore score={lead.aiPriorityScore} size="lg" showLabel />
          <p className="mt-2 text-[10px] font-medium text-zinc-600">AI Priority</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.04] bg-black/15 p-4">
          <p className={`text-[2rem] font-bold tabular-nums tracking-[-0.03em] ${probabilityColor}`}>
            {lead.closingProbability}%
          </p>
          <p className="mt-1 text-[10px] font-medium text-zinc-600">Lukkingssannsynlighet</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                lead.closingProbability >= 60
                  ? "bg-emerald-400"
                  : lead.closingProbability >= 35
                    ? "bg-amber-400/90"
                    : "bg-zinc-500"
              }`}
              style={{ width: `${lead.closingProbability}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg border border-white/[0.04] bg-black/10 px-3 py-2.5">
          <p className="text-[10px] text-zinc-600">Siste aktivitet</p>
          <p className="mt-0.5 text-[12px] font-medium text-zinc-300">{lead.lastActivity}</p>
        </div>
        <div className="rounded-lg border border-white/[0.04] bg-black/10 px-3 py-2.5">
          <p className="text-[10px] text-zinc-600">Kilde</p>
          <p className="mt-0.5 text-[12px] font-medium text-zinc-300">{lead.source}</p>
        </div>
      </div>
    </DetailSection>
  );
}

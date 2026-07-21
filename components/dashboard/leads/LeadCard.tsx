import Link from "next/link";
import { Clock, Home, Sparkles, TrendingUp } from "lucide-react";

import {
  dashboardAiHighlight,
  dashboardInteractiveCard,
} from "@/components/dashboard/dashboard-styles";

import { LeadContactInfo } from "./LeadContactInfo";
import { LeadPriorityScore } from "./LeadPriorityScore";
import { LeadQuickActions } from "./LeadQuickActions";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { Lead } from "./types";

const PRIORITY_STYLE: Record<Lead["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
  Medium: "bg-zinc-800/60 text-zinc-400 border-zinc-700/80",
  Lav: "bg-zinc-900/60 text-zinc-500 border-zinc-800",
};

type LeadCardProps = {
  lead: Lead;
};

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <article className={`group ${dashboardInteractiveCard} p-5`}>
      <div className="flex items-start gap-4">
        <LeadPriorityScore score={lead.aiPriorityScore} size="md" showLabel />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/dashboard/leads/${lead.id}`}
                className="truncate text-sm font-semibold tracking-[-0.02em] text-zinc-50 transition-colors hover:text-emerald-300"
              >
                {lead.customerName}
              </Link>
              <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-500">
                <Home className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                {lead.property}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${PRIORITY_STYLE[lead.priority]}`}
            >
              {lead.priority}
            </span>
          </div>

          <div className="mt-3">
            <LeadStatusBadge status={lead.status} stage={lead.stage} />
          </div>

          <div className="mt-3">
            <LeadContactInfo email={lead.email} phone={lead.phone} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-600">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.75} />
              {lead.lastActivity}
            </span>
            <span>{lead.source}</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400/60" strokeWidth={1.75} />
              {lead.closingProbability}% lukking
            </span>
          </div>
        </div>
      </div>

      <div className={`mt-4 px-4 py-3 ${dashboardAiHighlight}`}>
        <p className="flex items-start gap-2 text-xs leading-5 text-emerald-200/70">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/60" strokeWidth={1.75} />
          <span>
            <span className="font-medium text-emerald-300/80">Neste steg: </span>
            {lead.aiRecommendation}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <LeadQuickActions customerName={lead.customerName} variant="card" />
      </div>
    </article>
  );
}

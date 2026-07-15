import Link from "next/link";
import { Clock, Home, Sparkles, TrendingUp } from "lucide-react";

import { LeadContactInfo } from "./LeadContactInfo";
import { LeadPriorityScore } from "./LeadPriorityScore";
import { LeadQuickActions } from "./LeadQuickActions";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { Lead } from "./types";

const PRIORITY_STYLE: Record<Lead["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

type LeadCardProps = {
  lead: Lead;
};

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.28),0_0_24px_rgba(16,185,129,0.04)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="flex items-start gap-4">
        <LeadPriorityScore score={lead.aiPriorityScore} size="md" showLabel />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/dashboard/leads/${lead.id}`}
                className="truncate text-[15px] font-semibold tracking-[-0.02em] text-white transition-colors hover:text-emerald-300"
              >
                {lead.customerName}
              </Link>
              <p className="mt-1 flex items-center gap-1.5 truncate text-[12px] text-zinc-500">
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

      <div className="mt-4 rounded-xl border border-emerald-500/[0.08] bg-emerald-500/[0.04] px-4 py-3">
        <p className="flex items-start gap-2 text-[12px] leading-[1.65] text-emerald-200/70">
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

import { ArrowRight, Sparkles } from "lucide-react";

import {
  dashboardAiHighlight,
  dashboardBadge,
  dashboardFeaturedPanel,
  dashboardFocusRing,
  dashboardSectionLabel,
} from "@/components/dashboard/dashboard-styles";

import type { LeadAiSummary } from "./types";

const PRIORITY_STYLE: Record<LeadAiSummary["urgency"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
  Medium: "bg-zinc-800/60 text-zinc-400 border-zinc-700/80",
  Lav: "bg-zinc-900/60 text-zinc-500 border-zinc-800",
};

type LeadDetailAiSummaryProps = {
  aiSummary: LeadAiSummary;
  nextAction: string;
};

export function LeadDetailAiSummary({ aiSummary, nextAction }: LeadDetailAiSummaryProps) {
  return (
    <section className={dashboardFeaturedPanel}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08]">
              <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <p className={dashboardSectionLabel}>AI Intelligence</p>
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[aiSummary.urgency]}`}
            >
              {aiSummary.urgency} prioritet
            </span>
            <span className={dashboardBadge}>{aiSummary.confidence}% sikkerhet</span>
          </div>

          <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-zinc-50 lg:text-xl">
            {aiSummary.headline}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{aiSummary.summary}</p>

          <ul className="mt-5 space-y-2">
            {aiSummary.keyInsights.map((insight) => (
              <li key={insight} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/70" />
                <p className="text-sm leading-6 text-zinc-400">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={`w-full shrink-0 p-5 lg:max-w-xs ${dashboardAiHighlight}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400/70">
            Anbefalt neste handling
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-6 text-emerald-200/80">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/70" strokeWidth={1.75} />
            {nextAction}
          </p>
          <button
            type="button"
            className={`mt-4 w-full rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 transition-colors duration-150 hover:border-emerald-500/35 hover:bg-emerald-500/15 ${dashboardFocusRing}`}
          >
            Utfør med AI
          </button>
        </div>
      </div>
    </section>
  );
}

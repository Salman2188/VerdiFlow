import { ArrowRight, Sparkles } from "lucide-react";

import type { LeadAiSummary } from "./types";

const PRIORITY_STYLE: Record<LeadAiSummary["urgency"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

type LeadDetailAiSummaryProps = {
  aiSummary: LeadAiSummary;
  nextAction: string;
};

export function LeadDetailAiSummary({ aiSummary, nextAction }: LeadDetailAiSummaryProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),0_0_40px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-8 h-32 w-48 rounded-full bg-emerald-500/[0.1] blur-[60px]"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08]">
              <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              AI Sammendrag
            </p>
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[aiSummary.urgency]}`}
            >
              {aiSummary.urgency} prioritet
            </span>
            <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500">
              {aiSummary.confidence}% sikkerhet
            </span>
          </div>

          <h2 className="mt-4 text-xl font-bold tracking-[-0.03em] text-white lg:text-[1.35rem]">
            {aiSummary.headline}
          </h2>
          <p className="mt-3 text-[14px] leading-[1.75] tracking-[-0.01em] text-zinc-400">
            {aiSummary.summary}
          </p>

          <ul className="mt-5 space-y-2.5">
            {aiSummary.keyInsights.map((insight) => (
              <li key={insight} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.35)]" />
                <p className="text-[13px] leading-[1.65] text-zinc-400">{insight}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 lg:max-w-xs">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400/60">
            Anbefalt neste handling
          </p>
          <p className="mt-3 flex items-start gap-2 text-[13px] font-medium leading-[1.65] text-emerald-200/80">
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/70" strokeWidth={1.75} />
            {nextAction}
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-xl border border-emerald-500/25 bg-emerald-500/[0.1] px-4 py-2.5 text-[12px] font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-500/[0.15]"
          >
            Utfør med AI
          </button>
        </div>
      </div>
    </section>
  );
}

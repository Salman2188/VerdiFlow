import { CheckCircle2, Clock, Sparkles, Target } from "lucide-react";

import type { AiDailySummaryData } from "./types";

type AiDailySummaryProps = {
  summary: AiDailySummaryData;
};

export function AiDailySummary({ summary }: AiDailySummaryProps) {
  const stats = [
    {
      label: "Automasjoner i dag",
      value: summary.completedAutomations,
      icon: CheckCircle2,
    },
    {
      label: "Timer spart",
      value: `${summary.savedTimeHours}t`,
      icon: Clock,
    },
    {
      label: "Utkast venter",
      value: summary.draftsPending,
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/12 bg-gradient-to-br from-emerald-500/[0.05] via-white/[0.02] to-transparent p-6 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
            Daglig AI-oppsummering
          </p>
          <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white lg:text-xl">
            {summary.headline}
          </h2>

          <div className="mt-5">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-medium text-zinc-400">
              <Target className="h-3.5 w-3.5 text-emerald-400/70" strokeWidth={1.75} />
              Anbefalt fokus i dag
            </p>
            <ul className="space-y-2">
              {summary.recommendedFocus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.35)]" />
                  <p className="text-[13px] leading-[1.65] text-zinc-400">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:w-80">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.05] bg-black/15 px-3 py-4 text-center"
              >
                <Icon className="mx-auto h-4 w-4 text-emerald-400/70" strokeWidth={1.75} />
                <p className="mt-2 text-xl font-bold tabular-nums tracking-[-0.03em] text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] font-medium tracking-wide text-zinc-600 uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2, Clock, Sparkles, Target } from "lucide-react";

import {
  dashboardFeaturedPanel,
  dashboardSectionLabel,
  dashboardStatTile,
  dashboardStatTileLabel,
  dashboardStatTileValue,
} from "@/components/dashboard/dashboard-styles";

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
    <section className={dashboardFeaturedPanel}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className={dashboardSectionLabel}>Daglig AI-oppsummering</p>
          <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-zinc-50 lg:text-xl">
            {summary.headline}
          </h2>

          <div className="mt-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Target className="h-3.5 w-3.5 text-emerald-400/70" strokeWidth={1.75} />
              Anbefalt fokus i dag
            </p>
            <ul className="space-y-2">
              {summary.recommendedFocus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/70" />
                  <p className="text-sm leading-6 text-zinc-400">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:w-80">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`${dashboardStatTile} text-center`}>
                <Icon className="mx-auto h-4 w-4 text-emerald-400/70" strokeWidth={1.75} />
                <p className={`${dashboardStatTileValue} mt-2`}>{stat.value}</p>
                <p className={`${dashboardStatTileLabel} mt-1 normal-case`}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

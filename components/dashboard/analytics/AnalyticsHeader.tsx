import { KpiCard } from "@/components/dashboard/kpi/KpiCard";

import type { AnalyticsTopKpi } from "./types";

type AnalyticsHeaderProps = {
  kpis: AnalyticsTopKpi[];
};

export function AnalyticsHeader({ kpis }: AnalyticsHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-emerald-500/[0.08] blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
            Arbeidsområde
          </p>
          <h1 className="mt-3 text-[1.75rem] font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
            Analytics
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.7] tracking-[-0.01em] text-zinc-400">
            Få full oversikt over salgsytelse, AI-effektivitet og utviklingen i pipeline.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} metric={kpi} />
        ))}
      </div>
    </header>
  );
}

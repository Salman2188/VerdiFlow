import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

import type { AnalyticsForecast } from "./types";

type AnalyticsForecastProps = {
  forecast: AnalyticsForecast;
};

export function AnalyticsForecastCard({ forecast }: AnalyticsForecastProps) {
  const metrics = [
    { label: "Forventet pipeline neste måned", value: forecast.expectedPipeline, icon: TrendingUp },
    { label: "Forventede lukkede avtaler", value: String(forecast.expectedClosedDeals), icon: Target },
    { label: "Forventet omsetning", value: forecast.expectedRevenue, icon: Sparkles },
  ];

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

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08]">
              <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
                Prognose
              </p>
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">AI Prognose</h2>
            </div>
            <span className="ml-auto rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500 lg:ml-2">
              {forecast.confidence}% sikkerhet
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/[0.05] bg-black/15 px-4 py-4"
                >
                  <Icon className="h-4 w-4 text-emerald-400/70" strokeWidth={1.75} />
                  <p className="mt-3 text-xl font-bold tabular-nums tracking-[-0.03em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-600">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 lg:max-w-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400/60">
            Anbefalte handlinger
          </p>
          <ul className="mt-4 space-y-3">
            {forecast.recommendedActions.map((action) => (
              <li key={action} className="flex gap-2">
                <ArrowRight
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/55"
                  strokeWidth={1.75}
                />
                <p className="text-[12px] leading-[1.65] text-emerald-200/70">{action}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

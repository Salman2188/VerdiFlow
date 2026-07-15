import { TrendingDown, TrendingUp } from "lucide-react";

import { AnimatedMetric } from "./AnimatedMetric";
import { getKpiIcon } from "./icon-registry";
import { KpiSparkline } from "./KpiSparkline";
import type { KpiMetric } from "./types";

type KpiCardProps = {
  metric: KpiMetric;
};

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = getKpiIcon(metric.icon);
  const TrendIcon = metric.trend.positive ? TrendingUp : TrendingDown;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.28),0_0_24px_rgba(16,185,129,0.04)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.06] transition-colors duration-500 group-hover:border-emerald-500/18 group-hover:bg-emerald-500/[0.08]">
          <Icon className="h-[17px] w-[17px] text-emerald-400/80" strokeWidth={1.75} />
        </div>
        <KpiSparkline data={metric.sparkline} id={metric.id} />
      </div>

      <p className="mt-5 text-[12px] font-medium tracking-[-0.01em] text-zinc-500">
        {metric.label}
      </p>

      <p className="mt-1.5 text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-white">
        <AnimatedMetric
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          decimals={metric.decimals}
        />
      </p>

      <div className="mt-4 flex items-center gap-1.5">
        <TrendIcon
          className={`h-3.5 w-3.5 ${metric.trend.positive ? "text-emerald-400/80" : "text-rose-400/80"}`}
          strokeWidth={1.75}
        />
        <span
          className={`text-[11px] font-medium ${
            metric.trend.positive ? "text-emerald-400/75" : "text-rose-400/75"
          }`}
        >
          {metric.trend.value}
        </span>
        <span className="text-[11px] text-zinc-600">vs. forrige periode</span>
      </div>
    </article>
  );
}

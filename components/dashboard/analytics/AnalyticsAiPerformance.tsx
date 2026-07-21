import { Sparkles, TrendingDown, TrendingUp } from "lucide-react";

import { dashboardInteractiveCard } from "@/components/dashboard/dashboard-styles";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";
import { getAnalyticsIcon } from "@/components/dashboard/analytics/icon-registry";

import type { AiPerformanceMetric } from "./types";

type AnalyticsAiPerformanceProps = {
  metrics: AiPerformanceMetric[];
};

export function AnalyticsAiPerformance({ metrics }: AnalyticsAiPerformanceProps) {
  return (
    <AiSection
      title="AI-ytelse"
      subtitle="Effektivitet og automatisering"
      badge="Denne måneden"
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = getAnalyticsIcon(metric.icon);
          const TrendIcon = metric.trend.positive ? TrendingUp : TrendingDown;

          return (
            <article key={metric.id} className={`${dashboardInteractiveCard} p-4`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                <Icon className="h-3.5 w-3.5 text-emerald-400/75" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-xl font-semibold tabular-nums tracking-[-0.03em] text-zinc-50">
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-zinc-600">{metric.label}</p>
              <div className="mt-2 flex items-center gap-1">
                <TrendIcon
                  className={`h-3 w-3 ${metric.trend.positive ? "text-emerald-400/70" : "text-rose-400/70"}`}
                  strokeWidth={1.75}
                />
                <span
                  className={`text-[10px] font-medium ${metric.trend.positive ? "text-emerald-400/70" : "text-rose-400/70"}`}
                >
                  {metric.trend.value}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </AiSection>
  );
}

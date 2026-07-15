import { ArrowRight, Sparkles } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";
import { getAnalyticsIcon } from "@/components/dashboard/analytics/icon-registry";

import type { WeeklyInsight } from "./types";

type AnalyticsWeeklyInsightsProps = {
  insights: WeeklyInsight[];
};

export function AnalyticsWeeklyInsights({ insights }: AnalyticsWeeklyInsightsProps) {
  return (
    <AiSection
      title="Ukentlige innsikter"
      subtitle="AI-genererte anbefalinger"
      badge={`${insights.length} innsikter`}
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((insight) => {
          const Icon = getAnalyticsIcon(insight.icon);
          return (
            <article
              key={insight.id}
              className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                  <Icon className="h-3.5 w-3.5 text-emerald-400/75" strokeWidth={1.75} />
                </div>
                <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500">
                  {insight.confidence}% sikkerhet
                </span>
              </div>

              <h3 className="mt-4 text-[13px] font-semibold tracking-[-0.01em] text-white">
                {insight.title}
              </h3>

              <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/[0.07] bg-emerald-500/[0.03] px-3 py-2.5">
                <ArrowRight
                  className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/55"
                  strokeWidth={1.75}
                />
                <p className="text-[11px] leading-[1.6] font-medium text-emerald-200/65">
                  {insight.recommendation}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </AiSection>
  );
}

import { ArrowRight, Sparkles } from "lucide-react";

import {
  dashboardAiHighlight,
  dashboardBadge,
  dashboardInteractiveCard,
} from "@/components/dashboard/dashboard-styles";

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
            <article key={insight.id} className={`${dashboardInteractiveCard} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                  <Icon className="h-3.5 w-3.5 text-emerald-400/75" strokeWidth={1.75} />
                </div>
                <span className={dashboardBadge}>{insight.confidence}% sikkerhet</span>
              </div>

              <h3 className="mt-4 text-sm font-semibold tracking-[-0.01em] text-zinc-50">
                {insight.title}
              </h3>

              <div className={`mt-4 flex items-start gap-2 px-3 py-2.5 ${dashboardAiHighlight}`}>
                <ArrowRight
                  className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/55"
                  strokeWidth={1.75}
                />
                <p className="text-[11px] leading-5 font-medium text-emerald-200/65">
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

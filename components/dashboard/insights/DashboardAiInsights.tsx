import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { dashboardPanel, dashboardPanelPadding } from "@/components/dashboard/dashboard-styles";

import { DEFAULT_AI_INSIGHTS } from "./insights-data";
import { InsightCard } from "./InsightCard";
import type { AiInsight } from "./types";

type DashboardAiInsightsProps = {
  insights?: AiInsight[];
};

export function DashboardAiInsights({ insights = DEFAULT_AI_INSIGHTS }: DashboardAiInsightsProps) {
  return (
    <section aria-labelledby="dashboard-insights-heading">
      <DashboardSectionHeader
        id="dashboard-insights-heading"
        title="AI-innsikt"
        action={{ label: "Se alle", href: "/dashboard/ai" }}
      />

      <div className={`${dashboardPanel} ${dashboardPanelPadding}`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}

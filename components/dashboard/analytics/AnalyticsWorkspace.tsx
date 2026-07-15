"use client";

import { useEffect, useState } from "react";

import type { AnalyticsData } from "./types";
import { AnalyticsAgentLeaderboard } from "./AnalyticsAgentLeaderboard";
import { AnalyticsAiPerformance } from "./AnalyticsAiPerformance";
import { AnalyticsForecastCard } from "./AnalyticsForecast";
import { AnalyticsHeader } from "./AnalyticsHeader";
import { AnalyticsPerformance } from "./AnalyticsPerformance";
import { AnalyticsWeeklyInsights } from "./AnalyticsWeeklyInsights";

type AnalyticsWorkspaceProps = {
  initialData: AnalyticsData;
};

export function AnalyticsWorkspace({ initialData }: AnalyticsWorkspaceProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <AnalyticsHeader kpis={initialData.topKpis} />
      <AnalyticsPerformance
        chartLabels={initialData.salesChart.labels}
        chartSeries={initialData.salesChart.series}
        leadSources={initialData.leadSources}
      />
      <AnalyticsAiPerformance metrics={initialData.aiPerformance} />
      <AnalyticsAgentLeaderboard agents={initialData.agentLeaderboard} />
      <AnalyticsWeeklyInsights insights={initialData.weeklyInsights} />
      <AnalyticsForecastCard forecast={initialData.forecast} />
    </div>
  );
}

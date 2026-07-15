"use client";

import { useEffect, useState } from "react";

import { AnalyticsAgentLeaderboard } from "./AnalyticsAgentLeaderboard";
import { AnalyticsAiPerformance } from "./AnalyticsAiPerformance";
import { AnalyticsForecastCard } from "./AnalyticsForecast";
import { AnalyticsHeader } from "./AnalyticsHeader";
import { AnalyticsLoadingState } from "./AnalyticsLoadingState";
import { AnalyticsPerformance } from "./AnalyticsPerformance";
import { AnalyticsWeeklyInsights } from "./AnalyticsWeeklyInsights";
import { useAnalytics } from "./use-analytics";

export function AnalyticsWorkspace() {
  const { data, isLoading } = useAnalytics();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    setReady(false);
  }, [isLoading]);

  if (isLoading || !data) {
    return <AnalyticsLoadingState />;
  }

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <AnalyticsHeader kpis={data.topKpis} />
      <AnalyticsPerformance
        chartLabels={data.salesChart.labels}
        chartSeries={data.salesChart.series}
        leadSources={data.leadSources}
      />
      <AnalyticsAiPerformance metrics={data.aiPerformance} />
      <AnalyticsAgentLeaderboard agents={data.agentLeaderboard} />
      <AnalyticsWeeklyInsights insights={data.weeklyInsights} />
      <AnalyticsForecastCard forecast={data.forecast} />
    </div>
  );
}

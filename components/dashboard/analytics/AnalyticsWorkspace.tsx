"use client";

import { useEffect, useState } from "react";

import { dashboardPage } from "@/components/dashboard/dashboard-styles";

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
      className={`${dashboardPage} transition-opacity duration-300 ${
        ready ? "opacity-100" : "opacity-0"
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

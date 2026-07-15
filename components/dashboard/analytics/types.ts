import type { AnalyticsIconName } from "@/components/dashboard/analytics/icon-registry";
import type { KpiIconName } from "@/components/dashboard/kpi/icon-registry";

export type AnalyticsTrend = {
  value: string;
  positive: boolean;
};

export type AnalyticsTopKpi = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend: AnalyticsTrend;
  sparkline: number[];
  icon: KpiIconName;
};

export type SalesChartSeries = {
  id: string;
  label: string;
  color: string;
  data: number[];
};

export type LeadSource = {
  id: string;
  label: string;
  percentage: number;
  count: number;
  color: string;
};

export type AiPerformanceMetric = {
  id: string;
  label: string;
  value: string;
  trend: AnalyticsTrend;
  icon: AnalyticsIconName;
};

export type AgentPerformance = {
  id: string;
  name: string;
  closedDeals: number;
  pipelineValue: string;
  conversionRate: number;
  aiScore: number;
  isTopPerformer?: boolean;
};

export type WeeklyInsight = {
  id: string;
  title: string;
  recommendation: string;
  confidence: number;
  icon: AnalyticsIconName;
};

export type AnalyticsForecast = {
  expectedPipeline: string;
  expectedClosedDeals: number;
  expectedRevenue: string;
  confidence: number;
  recommendedActions: string[];
};

export type AnalyticsData = {
  topKpis: AnalyticsTopKpi[];
  salesChart: {
    labels: string[];
    series: SalesChartSeries[];
  };
  leadSources: LeadSource[];
  aiPerformance: AiPerformanceMetric[];
  agentLeaderboard: AgentPerformance[];
  weeklyInsights: WeeklyInsight[];
  forecast: AnalyticsForecast;
};

import { BarChart3 } from "lucide-react";

import { dashboardProgressTrack } from "@/components/dashboard/dashboard-styles";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { AnalyticsLineChart } from "./AnalyticsLineChart";
import type { LeadSource } from "./types";

type AnalyticsPerformanceProps = {
  chartLabels: string[];
  chartSeries: {
    id: string;
    label: string;
    color: string;
    data: number[];
  }[];
  leadSources: LeadSource[];
};

export function AnalyticsPerformance({
  chartLabels,
  chartSeries,
  leadSources,
}: AnalyticsPerformanceProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AiSection
        title="Salgsutvikling"
        subtitle="Siste 30 dager"
        icon={<BarChart3 className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
      >
        <AnalyticsLineChart labels={chartLabels} series={chartSeries} />
      </AiSection>

      <AiSection
        title="Lead-kilder"
        subtitle="Fordeling av nye leads"
        badge="Siste 30 dager"
      >
        <ul className="space-y-4">
          {leadSources.map((source) => (
            <li key={source.id}>
              <div className="mb-2 flex items-center justify-between text-[12px]">
                <span className="font-medium text-zinc-300">{source.label}</span>
                <span className="tabular-nums text-zinc-500">
                  {source.percentage}% · {source.count} leads
                </span>
              </div>
              <div className={dashboardProgressTrack}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${source.color}`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </AiSection>
    </div>
  );
}

import { KpiCard } from "@/components/dashboard/kpi/KpiCard";

import type { AnalyticsTopKpi } from "./types";

type AnalyticsHeaderProps = {
  kpis: AnalyticsTopKpi[];
};

export function AnalyticsHeader({ kpis }: AnalyticsHeaderProps) {
  return (
    <header className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} metric={kpi} />
      ))}
    </header>
  );
}

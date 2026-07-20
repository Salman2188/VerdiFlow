import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { DEFAULT_KPI_METRICS } from "./kpi-data";
import { KpiCard } from "./KpiCard";
import type { KpiMetric } from "./types";

const FEATURED_METRIC_ID = "pipeline-value";

type DashboardKpisProps = {
  metrics?: KpiMetric[];
};

export function DashboardKpis({ metrics = DEFAULT_KPI_METRICS }: DashboardKpisProps) {
  const featured = metrics.find((metric) => metric.id === FEATURED_METRIC_ID);
  const supporting = metrics.filter((metric) => metric.id !== FEATURED_METRIC_ID);

  return (
    <section aria-labelledby="dashboard-kpis-heading">
      <DashboardSectionHeader id="dashboard-kpis-heading" title="Nøkkeltall" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {featured ? (
          <div className="sm:col-span-2">
            <KpiCard metric={featured} featured />
          </div>
        ) : null}
        {supporting.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}

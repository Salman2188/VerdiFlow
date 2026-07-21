import { KpiCard } from "@/components/dashboard/kpi/KpiCard";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

import type { AnalyticsTopKpi } from "./types";

type AnalyticsHeaderProps = {
  kpis: AnalyticsTopKpi[];
};

export function AnalyticsHeader({ kpis }: AnalyticsHeaderProps) {
  return (
    <header className="space-y-6">
      <DashboardPageHeader
        label="Arbeidsområde"
        title="Analyse"
        description="Salgsytelse, AI-effektivitet og utvikling i pipeline."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} metric={kpi} />
        ))}
      </div>
    </header>
  );
}

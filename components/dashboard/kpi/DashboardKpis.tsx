"use client";

import { useEffect, useState } from "react";

import { KpiCard } from "./KpiCard";
import { DEFAULT_KPI_METRICS } from "./kpi-data";
import type { KpiMetric } from "./types";

type DashboardKpisProps = {
  metrics?: KpiMetric[];
};

export function DashboardKpis({ metrics = DEFAULT_KPI_METRICS }: DashboardKpisProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`mt-8 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:mt-10 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-label="Nøkkeltall"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>
    </section>
  );
}

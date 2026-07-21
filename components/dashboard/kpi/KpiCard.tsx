import {
  dashboardCardPadding,
  dashboardInteractiveCard,
  dashboardMetricLabel,
  dashboardMetricValue,
  dashboardMetricValueFeatured,
} from "@/components/dashboard/dashboard-styles";

import { MetricValue } from "./MetricValue";
import type { KpiMetric } from "./types";

type KpiCardProps = {
  metric: KpiMetric;
  featured?: boolean;
};

export function KpiCard({ metric, featured = false }: KpiCardProps) {
  const valueClass = featured ? dashboardMetricValueFeatured : dashboardMetricValue;

  return (
    <article className={`${dashboardInteractiveCard} ${dashboardCardPadding}`}>
      <p className={dashboardMetricLabel}>{metric.label}</p>
      <p className={`mt-2 ${valueClass}`}>
        <MetricValue
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          decimals={metric.decimals}
        />
      </p>
    </article>
  );
}

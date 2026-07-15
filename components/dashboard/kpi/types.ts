import type { KpiIconName } from "./icon-registry";

export type KpiMetric = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend: {
    value: string;
    positive: boolean;
  };
  sparkline: number[];
  icon: KpiIconName;
};

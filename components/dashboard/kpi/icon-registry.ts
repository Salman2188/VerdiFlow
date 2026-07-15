import {
  Banknote,
  Calendar,
  Circle,
  Clock,
  Flame,
  Percent,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export const KPI_ICON_NAMES = [
  "users",
  "trending-up",
  "flame",
  "clock",
  "calendar",
  "percent",
  "banknote",
] as const;

export type KpiIconName = (typeof KPI_ICON_NAMES)[number];

export const KPI_ICONS: Record<KpiIconName, LucideIcon> = {
  users: Users,
  "trending-up": TrendingUp,
  flame: Flame,
  clock: Clock,
  calendar: Calendar,
  percent: Percent,
  banknote: Banknote,
};

export function getKpiIcon(icon: KpiIconName | string | LucideIcon): LucideIcon {
  if (typeof icon === "function") {
    return icon;
  }

  if (typeof icon === "string" && icon in KPI_ICONS) {
    return KPI_ICONS[icon as KpiIconName];
  }

  return Circle;
}

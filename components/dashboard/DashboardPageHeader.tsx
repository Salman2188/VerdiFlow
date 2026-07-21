import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  dashboardPageHeader,
  dashboardPageTitle,
  dashboardSectionDescription,
  dashboardSectionLabel,
  dashboardStatTile,
  dashboardStatTileLabel,
  dashboardStatTileValue,
} from "./dashboard-styles";

export type DashboardPageStat = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  accent?: string;
};

type DashboardPageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  stats?: DashboardPageStat[];
  trailing?: ReactNode;
};

function StatsGrid({ stats }: { stats: DashboardPageStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const accent = stat.accent ?? "text-zinc-100";
        return (
          <div key={stat.label} className={dashboardStatTile}>
            <div className="flex items-center gap-2">
              {Icon ? (
                <Icon className={`h-3.5 w-3.5 ${accent}`} strokeWidth={1.75} aria-hidden="true" />
              ) : null}
              <span className={dashboardStatTileLabel}>{stat.label}</span>
            </div>
            <p className={`${dashboardStatTileValue} ${accent}`}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export function DashboardPageHeader({
  label,
  title,
  description,
  stats,
  trailing,
}: DashboardPageHeaderProps) {
  const hasStats = Boolean(stats && stats.length > 0);
  const hasTrailing = Boolean(trailing);

  return (
    <header className={dashboardPageHeader}>
      {hasTrailing && hasStats ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              {label ? <p className={dashboardSectionLabel}>{label}</p> : null}
              <h1 className={`${label ? "mt-1.5" : ""} ${dashboardPageTitle}`}>{title}</h1>
              {description ? (
                <p className={`mt-2 max-w-2xl ${dashboardSectionDescription}`}>{description}</p>
              ) : null}
            </div>
            <div className="w-full shrink-0 lg:w-auto">{trailing}</div>
          </div>
          <StatsGrid stats={stats!} />
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            {label ? <p className={dashboardSectionLabel}>{label}</p> : null}
            <h1 className={`${label ? "mt-1.5" : ""} ${dashboardPageTitle}`}>{title}</h1>
            {description ? (
              <p className={`mt-2 max-w-2xl ${dashboardSectionDescription}`}>{description}</p>
            ) : null}
          </div>

          {hasTrailing ? (
            <div className="w-full shrink-0 lg:w-auto">{trailing}</div>
          ) : hasStats ? (
            <StatsGrid stats={stats!} />
          ) : null}
        </div>
      )}
    </header>
  );
}

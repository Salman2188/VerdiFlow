import type { ReactNode } from "react";

import {
  dashboardBadge,
  dashboardSectionPanel,
  dashboardSectionPanelBody,
  dashboardSectionPanelHeader,
  dashboardSubdescription,
  dashboardSubheading,
} from "@/components/dashboard/dashboard-styles";

type AiSectionProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  badgeVariant?: "accent" | "neutral";
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

export function AiSection({
  title,
  subtitle,
  icon,
  badge,
  badgeVariant = "accent",
  children,
  className,
  noPadding = false,
}: AiSectionProps) {
  const badgeClassName =
    badgeVariant === "neutral"
      ? dashboardBadge
      : "rounded-md border border-emerald-500/20 bg-emerald-500/[0.06] px-2 py-0.5 text-[10px] font-medium text-emerald-400/90";

  return (
    <section className={`${dashboardSectionPanel} ${className ?? ""}`}>
      <div className={dashboardSectionPanelHeader}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {icon ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60">
                {icon}
              </div>
            ) : null}
            <div className="min-w-0">
              <h2 className={dashboardSubheading}>{title}</h2>
              {subtitle ? <p className={dashboardSubdescription}>{subtitle}</p> : null}
            </div>
          </div>
          {badge ? <span className={`shrink-0 ${badgeClassName}`}>{badge}</span> : null}
        </div>
      </div>

      <div className={noPadding ? "" : dashboardSectionPanelBody}>{children}</div>
    </section>
  );
}

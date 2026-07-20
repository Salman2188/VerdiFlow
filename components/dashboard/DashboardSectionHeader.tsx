import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import {
  dashboardFocusRing,
  dashboardSectionDescription,
  dashboardSectionLabel,
  dashboardSectionTitle,
  dashboardSubdescription,
  dashboardSubheading,
} from "./dashboard-styles";

type DashboardSectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  id?: string;
  action?: {
    label: string;
    href: string;
  };
  trailing?: ReactNode;
  /** Nested card headers use h3 + tighter spacing */
  variant?: "section" | "nested";
};

export function DashboardSectionHeader({
  label,
  title,
  description,
  id,
  action,
  trailing,
  variant = "section",
}: DashboardSectionHeaderProps) {
  const isNested = variant === "nested";
  const TitleTag = isNested ? "h3" : "h2";

  return (
    <div
      className={
        isNested
          ? "mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
          : "mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between"
      }
    >
      <div className="min-w-0">
        {label ? <p className={dashboardSectionLabel}>{label}</p> : null}
        <TitleTag
          id={id}
          className={
            isNested
              ? `${label ? "mt-1" : ""} ${dashboardSubheading}`
              : `${label ? "mt-1.5" : ""} ${dashboardSectionTitle}`
          }
        >
          {title}
        </TitleTag>
        {description ? (
          <p className={isNested ? dashboardSubdescription : dashboardSectionDescription}>
            {description}
          </p>
        ) : null}
      </div>
      {trailing ??
        (action ? (
          <Link
            href={action.href}
            className={`inline-flex shrink-0 items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 ${dashboardFocusRing} rounded-md`}
          >
            {action.label}
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        ) : null)}
    </div>
  );
}

"use client";

import { Menu } from "lucide-react";

import { DEFAULT_SIDEBAR_USER } from "@/components/dashboard/sidebar";
import {
  dashboardFocusRing,
  dashboardSectionDescription,
  dashboardSectionLabel,
} from "@/components/dashboard/dashboard-styles";
import { getDashboardPageMeta } from "@/components/dashboard/page-meta";

import { TopNavProfileMenu } from "./TopNavProfileMenu";
import type { TopNavUser } from "./types";

const DEFAULT_TOP_NAV_USER: TopNavUser = {
  name: DEFAULT_SIDEBAR_USER.name,
  agency: DEFAULT_SIDEBAR_USER.agency,
  email: "alex.rivera@compass.com",
};

type TopNavProps = {
  user?: TopNavUser;
  pathname?: string;
  onMenuClick?: () => void;
};

export function TopNav({
  user = DEFAULT_TOP_NAV_USER,
  pathname = "/dashboard",
  onMenuClick,
}: TopNavProps) {
  const page = getDashboardPageMeta(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {onMenuClick ? (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Åpne navigasjon"
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200 lg:hidden ${dashboardFocusRing}`}
            >
              <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : null}

          <div className="min-w-0">
            {page.label ? (
              <p className={`hidden sm:block ${dashboardSectionLabel}`}>{page.label}</p>
            ) : null}
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-zinc-100 sm:text-base">
              {page.title}
            </p>
            <p className={`hidden truncate md:block ${dashboardSectionDescription}`}>
              {page.description}
            </p>
          </div>
        </div>

        <TopNavProfileMenu user={user} />
      </div>
    </header>
  );
}

"use client";

import { Menu } from "lucide-react";

import { DEFAULT_SIDEBAR_USER } from "@/components/dashboard/sidebar";
import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";

import { TopNavProfileMenu } from "./TopNavProfileMenu";
import type { TopNavUser } from "./types";

const DEFAULT_TOP_NAV_USER: TopNavUser = {
  name: DEFAULT_SIDEBAR_USER.name,
  agency: DEFAULT_SIDEBAR_USER.agency,
  email: "alex.rivera@compass.com",
};

type TopNavProps = {
  user?: TopNavUser;
  onMenuClick?: () => void;
};

export function TopNav({ user = DEFAULT_TOP_NAV_USER, onMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {onMenuClick ? (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Åpne navigasjon"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200 lg:hidden ${dashboardFocusRing}`}
            >
              <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <TopNavProfileMenu user={user} />
      </div>
    </header>
  );
}

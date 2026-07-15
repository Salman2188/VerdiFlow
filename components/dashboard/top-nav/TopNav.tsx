import { DEFAULT_SIDEBAR_USER } from "@/components/dashboard/sidebar";

import { TopNavAiStatus } from "./TopNavAiStatus";
import { TopNavCalendar, TopNavNotifications } from "./TopNavActions";
import { TopNavProfileMenu } from "./TopNavProfileMenu";
import { TopNavSearch } from "./TopNavSearch";
import type { TopNavUser } from "./types";

const DEFAULT_TOP_NAV_USER: TopNavUser = {
  name: DEFAULT_SIDEBAR_USER.name,
  agency: DEFAULT_SIDEBAR_USER.agency,
  email: "alex.rivera@compass.com",
};

type TopNavProps = {
  user?: TopNavUser;
};

export function TopNav({ user = DEFAULT_TOP_NAV_USER }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-emerald-500/[0.03] to-transparent"
      />

      <div className="relative flex h-16 items-center justify-between gap-4 border-b border-white/[0.06] bg-[#0a0e0c]/75 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl backdrop-saturate-150 lg:px-8">
        <TopNavSearch />

        <div className="flex items-center gap-2 sm:gap-3">
          <TopNavAiStatus />
          <TopNavCalendar />
          <TopNavNotifications />
          <div className="mx-1 hidden h-5 w-px bg-white/[0.06] sm:block" />
          <TopNavProfileMenu user={user} />
        </div>
      </div>
    </header>
  );
}

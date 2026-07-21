"use client";

import { useState, type ReactNode } from "react";

import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import type { AuthenticatedNavUser } from "@/lib/auth/profile";

type DashboardFrameProps = {
  navUser: AuthenticatedNavUser;
  pathname?: string;
  children: ReactNode;
};

export function DashboardFrame({ navUser, pathname = "/dashboard", children }: DashboardFrameProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar
        user={navUser.sidebar}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav user={navUser.topNav} pathname={pathname} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

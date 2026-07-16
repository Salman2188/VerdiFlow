import type { ReactNode } from "react";

import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { getAuthenticatedNavUser } from "@/lib/auth/profile";
import { requireVerifiedUserForPath } from "@/lib/auth/server";

type DashboardShellProps = {
  children: ReactNode;
  pathname?: string;
};

export async function DashboardShell({ children, pathname = "/dashboard" }: DashboardShellProps) {
  const user = await requireVerifiedUserForPath(pathname);
  const navUser = await getAuthenticatedNavUser(user);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={navUser.sidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav user={navUser.topNav} />
        <main className="flex-1 px-6 py-8 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

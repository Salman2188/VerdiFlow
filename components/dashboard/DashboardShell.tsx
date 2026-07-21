import type { ReactNode } from "react";

import { DashboardFrame } from "@/components/dashboard/DashboardFrame";
import { getAuthenticatedNavUser, type AuthenticatedNavUser } from "@/lib/auth/profile";
import { requireVerifiedUserForPath } from "@/lib/auth/server";

type DashboardShellProps = {
  children: ReactNode;
  pathname?: string;
  navUser?: AuthenticatedNavUser;
};

export async function DashboardShell({
  children,
  pathname = "/dashboard",
  navUser: navUserProp,
}: DashboardShellProps) {
  const navUser =
    navUserProp ??
    (await (async () => {
      const user = await requireVerifiedUserForPath(pathname);
      return getAuthenticatedNavUser(user);
    })());

  return (
    <DashboardFrame navUser={navUser} pathname={pathname}>
      {children}
    </DashboardFrame>
  );
}

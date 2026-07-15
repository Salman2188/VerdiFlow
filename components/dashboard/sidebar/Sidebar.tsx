"use client";

import { usePathname } from "next/navigation";

import { DEFAULT_SIDEBAR_USER, SIDEBAR_NAV_ITEMS } from "./nav-config";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarProfile } from "./SidebarProfile";
import type { SidebarUser } from "./types";

type SidebarProps = {
  user?: SidebarUser;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ user = DEFAULT_SIDEBAR_USER }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="relative flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.04] bg-[#0a0e0c]/80 px-4 py-6 backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-500/[0.04] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
      />

      <div className="relative mb-10 px-2">
        <SidebarLogo />
      </div>

      <nav className="relative flex flex-1 flex-col gap-1" aria-label="Main navigation">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={isNavActive(pathname, item.href)}
          />
        ))}
      </nav>

      <div className="relative mt-6">
        <SidebarProfile user={user} />
      </div>
    </aside>
  );
}

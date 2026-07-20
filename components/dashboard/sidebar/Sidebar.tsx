"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";

import { DEFAULT_SIDEBAR_USER, SIDEBAR_NAV_ITEMS } from "./nav-config";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarProfile } from "./SidebarProfile";
import type { SidebarUser } from "./types";

type SidebarProps = {
  user?: SidebarUser;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({
  user,
  pathname,
  onNavigate,
  showLogo = true,
}: {
  user: SidebarUser;
  pathname: string;
  onNavigate?: () => void;
  showLogo?: boolean;
}) {
  return (
    <>
      {showLogo ? (
        <div className="mb-10 px-2">
          <SidebarLogo />
        </div>
      ) : null}

      <nav className="flex flex-1 flex-col gap-1" aria-label="Hovednavigasjon">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={isNavActive(pathname, item.href)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="mt-6">
        <SidebarProfile user={user} />
      </div>
    </>
  );
}

export function Sidebar({
  user = DEFAULT_SIDEBAR_USER,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMobileClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEscape);
    };
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      <aside className="relative hidden h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 px-4 py-6 lg:flex">
        <div className="relative flex h-full flex-col">
          <SidebarContent user={user} pathname={pathname} />
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Lukk navigasjon"
            className="absolute inset-0 bg-black/60"
            onClick={onMobileClose}
          />
          <aside className="relative flex h-full w-[min(100%,16rem)] flex-col border-r border-zinc-800 bg-zinc-950 px-4 py-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between px-2">
              <SidebarLogo />
              <button
                type="button"
                onClick={onMobileClose}
                aria-label="Lukk navigasjon"
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 ${dashboardFocusRing}`}
              >
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto">
              <SidebarContent
                user={user}
                pathname={pathname}
                onNavigate={onMobileClose}
                showLogo={false}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

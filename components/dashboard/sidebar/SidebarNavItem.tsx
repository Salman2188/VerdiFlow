"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";

type SidebarNavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onNavigate?: () => void;
};

export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isActive,
  onNavigate,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-[background-color,color] duration-150 ${dashboardFocusRing} ${
        isActive
          ? "bg-zinc-800/80 text-zinc-50"
          : "text-zinc-500 hover:bg-zinc-900/80 hover:text-zinc-200"
      }`}
    >
      {isActive ? (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-emerald-400"
        />
      ) : null}

      <Icon
        className={`relative h-4 w-4 shrink-0 ${
          isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
        }`}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="relative">{label}</span>
    </Link>
  );
}

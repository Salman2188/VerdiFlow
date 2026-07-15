"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type SidebarNavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
};

export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isActive,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive
          ? "bg-emerald-500/[0.08] text-emerald-100"
          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
      }`}
    >
      {isActive && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/[0.06] to-transparent"
          />
        </>
      )}

      <Icon
        className={`relative h-[18px] w-[18px] shrink-0 transition-all duration-300 ${
          isActive
            ? "text-emerald-400"
            : "text-zinc-500 group-hover:text-zinc-300 group-hover:scale-105"
        }`}
        strokeWidth={1.75}
      />
      <span className="relative">{label}</span>
    </Link>
  );
}

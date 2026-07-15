"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { TopNavUser } from "./types";

type TopNavProfileMenuProps = {
  user: TopNavUser;
};

const MENU_ITEMS = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Sign out", icon: LogOut },
] as const;

export function TopNavProfileMenu({ user }: TopNavProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] py-1 pl-1 pr-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.08] hover:bg-white/[0.05] active:scale-[0.98]"
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-7 w-7 rounded-lg object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          />
        ) : (
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400/50 via-teal-500/40 to-emerald-700/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
        )}
        <span className="hidden max-w-[7rem] truncate text-[12px] font-medium tracking-[-0.01em] text-zinc-300 md:block">
          {user.name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-[calc(100%+8px)] right-0 z-50 w-56 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c100e]/95 p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl"
        >
          <div className="border-b border-white/[0.05] px-3 py-2.5">
            <p className="truncate text-[13px] font-semibold tracking-[-0.01em] text-white">
              {user.name}
            </p>
            <p className="truncate text-[11px] text-zinc-500">{user.email}</p>
          </div>
          <div className="py-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-400 transition-colors duration-300 hover:bg-white/[0.04] hover:text-zinc-200"
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";
import { signOutAction } from "@/lib/auth/actions";

import type { TopNavUser } from "./types";

type TopNavProfileMenuProps = {
  user: TopNavUser;
};

export function TopNavProfileMenu({ user }: TopNavProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    <div ref={ref} className="relative ml-auto">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 py-1 pl-1 pr-2 transition-colors hover:border-zinc-700 hover:bg-zinc-900 ${dashboardFocusRing}`}
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            className="h-7 w-7 rounded-md object-cover ring-1 ring-zinc-700"
          />
        ) : (
          <div
            className="h-7 w-7 rounded-md bg-zinc-800 ring-1 ring-zinc-700"
            aria-hidden="true"
          />
        )}
        <span className="hidden max-w-[7rem] truncate text-xs font-medium text-zinc-300 md:block">
          {user.name}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+8px)] right-0 z-50 w-52 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-1 shadow-xl"
        >
          <div className="border-b border-zinc-800 px-3 py-2.5">
            <p className="truncate text-sm font-medium text-zinc-100">{user.name}</p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              disabled={isPending}
              onClick={() => {
                setOpen(false);
                router.push("/dashboard/settings");
              }}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100 disabled:opacity-60 ${dashboardFocusRing}`}
            >
              <Settings className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Innstillinger
            </button>
            <button
              type="button"
              role="menuitem"
              disabled={isPending}
              onClick={() => {
                setOpen(false);
                startTransition(async () => {
                  await signOutAction();
                });
              }}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100 disabled:opacity-60 ${dashboardFocusRing}`}
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {isPending ? "Logger ut…" : "Logg ut"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function TopNavSearch() {
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    setShortcut(isMac ? "⌘K" : "Ctrl K");
  }, []);

  return (
    <button
      type="button"
      className="group flex h-9 w-full max-w-sm items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.09] hover:bg-white/[0.05]"
      aria-label="Search"
    >
      <Search
        className="h-4 w-4 shrink-0 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400"
        strokeWidth={1.75}
      />
      <span className="flex-1 text-[13px] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
        Search leads, deals, contacts...
      </span>
      <kbd className="hidden rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-zinc-500 sm:inline-block">
        {shortcut}
      </kbd>
    </button>
  );
}

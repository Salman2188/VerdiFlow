import { Brain, Sparkles } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

export function AiAssistantHeader() {
  return (
    <DashboardPageHeader
      trailing={
        <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
              <Sparkles className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              AI aktiv
            </p>
            <p className="text-[10px] text-zinc-500">24 automasjoner kjører</p>
          </div>
          <Brain className="ml-1 h-4 w-4 text-emerald-400/70" strokeWidth={1.75} aria-hidden="true" />
        </div>
      }
    />
  );
}

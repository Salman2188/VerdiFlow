import { Calendar, Mail, Phone, Sparkles } from "lucide-react";

import {
  dashboardFocusRing,
} from "@/components/dashboard/dashboard-styles";

type LeadQuickActionsProps = {
  variant?: "card" | "table";
  customerName: string;
};

export function LeadQuickActions({ variant = "card", customerName }: LeadQuickActionsProps) {
  const buttonClass =
    variant === "table"
      ? `flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/40 text-zinc-500 transition-colors duration-150 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-300 ${dashboardFocusRing}`
      : `flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors duration-150 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-200 ${dashboardFocusRing}`;

  const aiButtonClass =
    variant === "table"
      ? `flex h-8 items-center justify-center gap-1 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 text-[10px] font-medium text-emerald-400/80 transition-colors duration-150 hover:border-emerald-500/25 hover:bg-emerald-500/10 hover:text-emerald-300 ${dashboardFocusRing}`
      : `flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-2 text-xs font-medium text-emerald-400/80 transition-colors duration-150 hover:border-emerald-500/25 hover:bg-emerald-500/10 hover:text-emerald-300 ${dashboardFocusRing}`;

  if (variant === "table") {
    return (
      <div className="flex items-center gap-1.5">
        <button type="button" className={buttonClass} title={`Ring ${customerName}`}>
          <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button type="button" className={buttonClass} title={`Send e-post til ${customerName}`}>
          <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button type="button" className={buttonClass} title="Book visning">
          <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
        <button type="button" className={aiButtonClass} title="AI oppfølging">
          <Sparkles className="h-3 w-3" strokeWidth={1.75} />
          <span className="hidden xl:inline">AI</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className={buttonClass}>
        <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
        Ring
      </button>
      <button type="button" className={buttonClass}>
        <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
        E-post
      </button>
      <button type="button" className={aiButtonClass}>
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
        AI-utkast
      </button>
    </div>
  );
}

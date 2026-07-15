import { Calendar, Mail, Phone, Sparkles } from "lucide-react";

type LeadQuickActionsProps = {
  variant?: "card" | "table";
  customerName: string;
};

export function LeadQuickActions({ variant = "card", customerName }: LeadQuickActionsProps) {
  const buttonClass =
    variant === "table"
      ? "flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-zinc-500 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-300"
      : "flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-200";

  const aiButtonClass =
    variant === "table"
      ? "flex h-8 items-center justify-center gap-1 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 text-[10px] font-medium text-emerald-400/80 transition-all duration-300 hover:border-emerald-500/25 hover:bg-emerald-500/[0.1] hover:text-emerald-300"
      : "flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-2 text-[11px] font-medium text-emerald-400/80 transition-all duration-300 hover:border-emerald-500/25 hover:bg-emerald-500/[0.1] hover:text-emerald-300";

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
    <div className="flex gap-2">
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

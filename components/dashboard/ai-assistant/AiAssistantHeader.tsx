import { Brain, Sparkles, Zap } from "lucide-react";

export function AiAssistantHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-emerald-500/[0.08] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-56 rounded-full bg-teal-500/[0.05] blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.08] shadow-[0_0_24px_rgba(16,185,129,0.08)]">
            <Brain className="h-6 w-6 text-emerald-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
              Intelligent kjerne
            </p>
            <h1 className="mt-1 text-[1.75rem] font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
              AI Assistent
            </h1>
            <p className="mt-2 max-w-lg text-[14px] leading-[1.7] text-zinc-400">
              Din intelligente partner. Spør, planlegg og utfør — AI håndterer resten.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-300">
              <Sparkles className="h-3 w-3" strokeWidth={1.75} />
              AI Online
            </p>
            <p className="text-[10px] text-zinc-600">24 automasjoner kjører</p>
          </div>
          <Zap className="ml-2 h-4 w-4 text-emerald-400/50" strokeWidth={1.75} />
        </div>
      </div>
    </header>
  );
}

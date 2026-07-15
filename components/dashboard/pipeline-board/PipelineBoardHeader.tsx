import { Kanban, Target, TrendingUp, Users } from "lucide-react";

import type { PipelineBoardStats } from "./types";

type PipelineBoardHeaderProps = {
  stats: PipelineBoardStats;
};

export function PipelineBoardHeader({ stats }: PipelineBoardHeaderProps) {
  const statItems = [
    { label: "Totalt i pipeline", value: stats.total, icon: Users, accent: "text-zinc-300" },
    {
      label: "I forhandling",
      value: stats.inNegotiation,
      icon: Target,
      accent: "text-amber-400/90",
    },
    {
      label: "Høy prioritet",
      value: stats.highPriority,
      icon: TrendingUp,
      accent: "text-emerald-400/90",
    },
    { label: "Solgt", value: stats.sold, icon: Kanban, accent: "text-sky-400/90" },
  ];

  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-emerald-500/[0.08] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
            Salgsprosess
          </p>
          <h1 className="mt-3 text-[1.75rem] font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
            Pipeline
          </h1>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.7] tracking-[-0.01em] text-zinc-400">
            Dra leads mellom faser for å holde oversikt. AI prioriterer hvem som trenger
            oppfølging — så du lukker flere avtaler raskere.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {statItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.05] bg-black/15 px-4 py-3.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-3.5 w-3.5 ${item.accent}`} strokeWidth={1.75} />
                  <span className="text-[10px] font-medium tracking-wide text-zinc-600 uppercase">
                    {item.label}
                  </span>
                </div>
                <p
                  className={`mt-1.5 text-xl font-bold tabular-nums tracking-[-0.03em] ${item.accent}`}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}

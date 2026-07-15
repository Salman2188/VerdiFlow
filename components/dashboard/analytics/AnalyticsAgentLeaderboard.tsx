import { Crown, Users } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import type { AgentPerformance } from "./types";

type AnalyticsAgentLeaderboardProps = {
  agents: AgentPerformance[];
};

export function AnalyticsAgentLeaderboard({ agents }: AnalyticsAgentLeaderboardProps) {
  return (
    <AiSection
      title="Meglerprestasjon"
      subtitle="Leaderboard denne måneden"
      icon={<Users className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {["Megler", "Lukkede salg", "Pipeline-verdi", "Konverteringsrate", "AI-score"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase first:pl-0"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={agent.id}
                className={`border-b border-white/[0.03] transition-colors duration-300 hover:bg-white/[0.02] ${
                  index === agents.length - 1 ? "border-b-0" : ""
                } ${agent.isTopPerformer ? "bg-emerald-500/[0.04]" : ""}`}
              >
                <td className="px-4 py-4 first:pl-0">
                  <div className="flex items-center gap-2">
                    {agent.isTopPerformer && (
                      <Crown className="h-3.5 w-3.5 text-amber-400/80" strokeWidth={1.75} />
                    )}
                    <span
                      className={`text-[13px] font-semibold ${agent.isTopPerformer ? "text-emerald-300" : "text-white"}`}
                    >
                      {agent.name}
                    </span>
                    {agent.isTopPerformer && (
                      <span className="rounded-md border border-amber-500/20 bg-amber-500/[0.08] px-1.5 py-0.5 text-[9px] font-semibold text-amber-400/80">
                        Topp
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-[13px] tabular-nums text-zinc-300">
                  {agent.closedDeals}
                </td>
                <td className="px-4 py-4 text-[13px] text-zinc-300">{agent.pipelineValue}</td>
                <td className="px-4 py-4 text-[13px] tabular-nums text-emerald-400/80">
                  {agent.conversionRate}%
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-2 text-[12px] font-bold tabular-nums text-emerald-400">
                    {agent.aiScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AiSection>
  );
}

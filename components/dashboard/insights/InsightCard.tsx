import { dashboardCardPadding, dashboardCardStatic } from "@/components/dashboard/dashboard-styles";

import type { AiInsight } from "./types";

type InsightCardProps = {
  insight: AiInsight;
};

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className={`${dashboardCardStatic} ${dashboardCardPadding}`}>
      {insight.priority ? (
        <p className="text-[11px] font-medium text-zinc-500">
          {insight.priority} prioritet · {insight.confidence}% sikkerhet
        </p>
      ) : (
        <p className="text-[11px] font-medium text-zinc-500">{insight.confidence}% sikkerhet</p>
      )}

      <h3 className="mt-2 text-sm font-medium text-zinc-100">{insight.title}</h3>

      <p className="mt-2 text-xs leading-5 text-zinc-400">{insight.explanation}</p>

      <p className="mt-4 border-t border-zinc-800/80 pt-3 text-xs text-zinc-300">{insight.action}</p>
    </article>
  );
}

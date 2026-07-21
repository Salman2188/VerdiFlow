import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import {
  dashboardAiHighlight,
  dashboardBadge,
  dashboardFocusRing,
  dashboardInteractiveCard,
} from "@/components/dashboard/dashboard-styles";

import { AiSection } from "./AiSection";
import type { AiRecommendation } from "./types";

const PRIORITY_STYLE: Record<AiRecommendation["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
  Medium: "bg-zinc-800/60 text-zinc-400 border-zinc-700/80",
  Lav: "bg-zinc-900/60 text-zinc-500 border-zinc-800",
};

type AiRecommendationCardProps = {
  recommendation: AiRecommendation;
};

function AiRecommendationCard({ recommendation }: AiRecommendationCardProps) {
  return (
    <article className={`${dashboardInteractiveCard} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400/75" strokeWidth={1.75} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[recommendation.priority]}`}
          >
            {recommendation.priority}
          </span>
          <span className={dashboardBadge}>{recommendation.confidence}% sikkerhet</span>
        </div>
      </div>

      <Link
        href={`/dashboard/leads/${recommendation.leadId}`}
        className="mt-4 block text-sm font-semibold tracking-[-0.01em] text-zinc-50 transition-colors hover:text-emerald-300"
      >
        {recommendation.customerName}
      </Link>

      <p className="mt-2 text-xs leading-5 text-zinc-500">{recommendation.reason}</p>

      <div className={`mt-4 flex items-start gap-2 px-3 py-2.5 ${dashboardAiHighlight}`}>
        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/55" strokeWidth={1.75} />
        <p className="text-[11px] leading-5 font-medium text-emerald-200/65">
          {recommendation.action}
        </p>
      </div>

      <button
        type="button"
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2.5 text-xs font-semibold text-emerald-300 transition-colors duration-150 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] ${dashboardFocusRing}`}
      >
        <Zap className="h-3.5 w-3.5" strokeWidth={1.75} />
        Utfør
      </button>
    </article>
  );
}

type AiRecommendationsProps = {
  recommendations: AiRecommendation[];
};

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  return (
    <AiSection
      title="AI Anbefalinger"
      subtitle="Handlingsforslag prioritert av AI"
      badge={`${recommendations.length} aktive`}
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {recommendations.map((rec) => (
          <AiRecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </AiSection>
  );
}

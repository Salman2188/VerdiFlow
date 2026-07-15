import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import { AiSection } from "./AiSection";
import type { AiRecommendation } from "./types";

const PRIORITY_STYLE: Record<AiRecommendation["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

type AiRecommendationCardProps = {
  recommendation: AiRecommendation;
};

function AiRecommendationCard({ recommendation }: AiRecommendationCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03] hover:shadow-[0_6px_24px_rgba(0,0,0,0.22),0_0_20px_rgba(16,185,129,0.03)]">
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
          <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500">
            {recommendation.confidence}% sikkerhet
          </span>
        </div>
      </div>

      <Link
        href={`/dashboard/leads/${recommendation.leadId}`}
        className="mt-4 block text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors hover:text-emerald-300"
      >
        {recommendation.customerName}
      </Link>

      <p className="mt-2 text-[12px] leading-[1.65] tracking-[-0.01em] text-zinc-500">
        {recommendation.reason}
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/[0.07] bg-emerald-500/[0.03] px-3 py-2.5">
        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/55" strokeWidth={1.75} />
        <p className="text-[11px] leading-[1.6] font-medium text-emerald-200/65">
          {recommendation.action}
        </p>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2.5 text-[12px] font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12]"
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

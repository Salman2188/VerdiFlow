"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { DEFAULT_AI_INSIGHTS } from "./insights-data";
import { InsightCard } from "./InsightCard";
import type { AiInsight } from "./types";

type DashboardAiInsightsProps = {
  insights?: AiInsight[];
};

export function DashboardAiInsights({
  insights = DEFAULT_AI_INSIGHTS,
}: DashboardAiInsightsProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`mt-8 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:mt-10 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      aria-label="AI Innsikt"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-8 h-28 w-40 rounded-full bg-emerald-500/[0.07] blur-[50px]"
        />

        <div className="relative mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/12 bg-emerald-500/[0.06]">
            <Sparkles className="h-4 w-4 text-emerald-400/80" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">
              AI Innsikt
            </h2>
            <p className="mt-1 text-[12px] text-zinc-500">
              Kontinuerlig analyse av pipeline, engasjement og salgsprognoser
            </p>
          </div>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}

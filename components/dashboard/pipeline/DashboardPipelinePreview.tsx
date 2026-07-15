"use client";

import { useEffect, useState } from "react";

import { DEFAULT_PIPELINE_STAGES } from "./pipeline-data";
import { PipelineStageColumn } from "./PipelineStageColumn";
import type { PipelineStage } from "./types";

type DashboardPipelinePreviewProps = {
  stages?: PipelineStage[];
};

export function DashboardPipelinePreview({
  stages = DEFAULT_PIPELINE_STAGES,
}: DashboardPipelinePreviewProps) {
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
      aria-label="Live pipeline"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-8 h-32 w-48 rounded-full bg-emerald-500/[0.06] blur-[60px]"
        />

        <div className="relative mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
              Live pipeline
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
              Hvem fortjener oppmerksomhet i dag?
            </h2>
          </div>
          <p className="text-[12px] text-zinc-500">Oppdatert i sanntid · Prioritert av AI</p>
        </div>

        <div className="relative -mx-2 flex gap-4 overflow-x-auto px-2 pb-1 lg:gap-6">
          {stages.map((stage) => (
            <PipelineStageColumn key={stage.id} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

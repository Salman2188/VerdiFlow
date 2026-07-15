"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { DEFAULT_HERO_CONTENT } from "./hero-content";
import type { DashboardHeroContent } from "./types";

type DashboardHeroProps = {
  content?: DashboardHeroContent;
};

export function DashboardHero({ content = DEFAULT_HERO_CONTENT }: DashboardHeroProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`relative transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
        ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-emerald-500/[0.1] blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 left-1/4 h-40 w-56 rounded-full bg-teal-500/[0.05] blur-[60px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-2xl flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
              Mission Control
            </p>
            <h1 className="mt-4 text-[2rem] font-bold tracking-[-0.04em] text-white sm:text-[2.25rem]">
              God morgen, {content.agentName}.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.75] tracking-[-0.01em] text-zinc-400">
              {content.aiSummary}
            </p>
          </div>

          <button
            type="button"
            className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600 px-8 text-[14px] font-semibold tracking-[-0.015em] text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_0_1px_rgba(52,211,153,0.3),0_4px_20px_rgba(16,185,129,0.25)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,185,129,0.35)] active:translate-y-0 active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
            <span className="relative">Start arbeidsdagen</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </div>

        <div className="relative mt-10 grid gap-6 lg:mt-12 lg:grid-cols-5 lg:gap-8">
          <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-6 lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold tracking-[-0.02em] text-white">
                Dagens fokus
              </h2>
              <span className="text-[11px] text-zinc-500">Prioritert av AI</span>
            </div>
            <ol className="space-y-4">
              {content.focusTasks.map((task) => (
                <li
                  key={task.id}
                  className="group flex gap-4 rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-all duration-300 hover:border-white/[0.06] hover:bg-black/25"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] text-[12px] font-bold text-emerald-400/90">
                    {task.priority}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium tracking-[-0.01em] text-white">
                      {task.title}
                    </p>
                    <p className="mt-1 text-[12px] text-zinc-500">{task.context}</p>
                    <p className="mt-2 text-[11px] font-medium text-emerald-400/65">
                      {task.value}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-white/[0.05] bg-gradient-to-b from-emerald-500/[0.03] to-transparent p-6 lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />
              </div>
              <h2 className="text-[13px] font-semibold tracking-[-0.02em] text-white">
                AI Daglig briefing
              </h2>
            </div>
            <ul className="space-y-4">
              {content.briefInsights.map((insight) => (
                <li key={insight.id} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.35)]" />
                  <p className="text-[13px] leading-[1.7] tracking-[-0.01em] text-zinc-400">
                    {insight.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

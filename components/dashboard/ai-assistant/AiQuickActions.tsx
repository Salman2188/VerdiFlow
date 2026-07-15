"use client";

import {
  BarChart3,
  Calendar,
  FileText,
  ListOrdered,
  Sparkles,
  Sun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AiSection } from "./AiSection";
import type { QuickAction, QuickActionId } from "./types";

const ACTION_ICONS: Record<QuickActionId, LucideIcon> = {
  "summarize-day": Sun,
  "prioritize-leads": ListOrdered,
  "write-followup": FileText,
  "sales-forecast": BarChart3,
  "plan-day": Calendar,
  "weekly-report": Sparkles,
};

type AiQuickActionsProps = {
  actions: QuickAction[];
  onAction: (actionId: QuickActionId) => void;
  disabled?: boolean;
};

export function AiQuickActions({ actions, onAction, disabled }: AiQuickActionsProps) {
  return (
    <AiSection
      title="Hurtighandlinger"
      subtitle="Ett klikk — AI gjør jobben"
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const Icon = ACTION_ICONS[action.id];
          return (
            <button
              key={action.id}
              type="button"
              disabled={disabled}
              onClick={() => onAction(action.id)}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 text-left shadow-[0_2px_16px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-emerald-500/15 hover:bg-white/[0.04] hover:shadow-[0_8px_32px_rgba(0,0,0,0.24),0_0_20px_rgba(16,185,129,0.05)] disabled:opacity-50"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.06] transition-colors duration-500 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.1]">
                <Icon className="h-5 w-5 text-emerald-400/80" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-[14px] font-semibold tracking-[-0.02em] text-white">
                {action.label}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-zinc-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </AiSection>
  );
}

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

import { dashboardFocusRing, dashboardInteractiveCard } from "@/components/dashboard/dashboard-styles";

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
              className={`group ${dashboardInteractiveCard} p-5 text-left disabled:opacity-50 ${dashboardFocusRing}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06] transition-colors duration-150 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.1]">
                <Icon className="h-5 w-5 text-emerald-400/80" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold tracking-[-0.02em] text-zinc-50">
                {action.label}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">{action.description}</p>
            </button>
          );
        })}
      </div>
    </AiSection>
  );
}

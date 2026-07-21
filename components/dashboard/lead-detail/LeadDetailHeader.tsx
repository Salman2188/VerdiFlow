import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, TrendingUp } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";
import { LeadQuickActions } from "@/components/dashboard/leads/LeadQuickActions";
import { LeadStatusBadge } from "@/components/dashboard/leads/LeadStatusBadge";

import type { LeadDetail } from "./types";

type LeadDetailHeaderProps = {
  detail: LeadDetail;
};

export function LeadDetailHeader({ detail }: LeadDetailHeaderProps) {
  const { lead } = detail;

  return (
    <header className="space-y-4">
      <Link
        href="/dashboard/leads"
        className={`inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors duration-150 hover:text-emerald-400 ${dashboardFocusRing}`}
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
        Tilbake til leads
      </Link>

      <DashboardPageHeader
        label="Lead Intelligence"
        title={lead.customerName}
        description={lead.property}
        stats={[
          {
            label: "AI-score",
            value: lead.aiPriorityScore,
            icon: Sparkles,
            accent: "text-emerald-400",
          },
          {
            label: "Lukking",
            value: `${lead.closingProbability}%`,
            icon: TrendingUp,
            accent:
              lead.closingProbability >= 60
                ? "text-emerald-400"
                : lead.closingProbability >= 35
                  ? "text-amber-400"
                  : "text-zinc-400",
          },
          {
            label: "Sist aktiv",
            value: lead.lastActivity,
            icon: Clock,
          },
          {
            label: "Kilde",
            value: lead.source,
          },
        ]}
        trailing={
          <div className="flex w-full flex-col items-stretch gap-3 sm:items-end">
            <LeadStatusBadge status={lead.status} stage={lead.stage} />
            <LeadQuickActions customerName={lead.customerName} variant="card" />
          </div>
        }
      />
    </header>
  );
}

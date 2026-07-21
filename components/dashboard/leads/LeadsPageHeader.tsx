import { AlertCircle, Sparkles, TrendingUp, Users } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";

import type { LeadsStats } from "./types";

type LeadsPageHeaderProps = {
  stats: LeadsStats;
};

export function LeadsPageHeader({ stats }: LeadsPageHeaderProps) {
  return (
    <DashboardPageHeader
      label="Arbeidsområde"
      title="Leads"
      description="Hvem bør du kontakte nå for å lukke flere avtaler?"
      stats={[
        { label: "Totalt leads", value: stats.total, icon: Users },
        {
          label: "Krever handling",
          value: stats.requiresAction,
          icon: AlertCircle,
          accent: "text-rose-400/90",
        },
        { label: "Nye i dag", value: stats.newToday, icon: Sparkles, accent: "text-sky-400/90" },
        {
          label: "Gj.snitt AI-score",
          value: stats.averageAiScore,
          icon: TrendingUp,
          accent: "text-emerald-400/90",
        },
      ]}
    />
  );
}

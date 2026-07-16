import { DashboardAiInsights } from "@/components/dashboard/insights";
import { DashboardHero } from "@/components/dashboard/hero";
import { DashboardKpis } from "@/components/dashboard/kpi";
import { DashboardPipelinePreview } from "@/components/dashboard/pipeline";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  getDashboardInsights,
  getDashboardKpis,
  getDashboardPipelinePreview,
} from "@/lib/services/dashboard.service";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [metrics, stages, insights] = await Promise.all([
    getDashboardKpis(),
    getDashboardPipelinePreview(),
    getDashboardInsights(),
  ]);

  return (
    <DashboardShell pathname="/dashboard">
      <DashboardHero />
      <DashboardKpis metrics={metrics} />
      <DashboardPipelinePreview stages={stages} />
      <DashboardAiInsights insights={insights} />
    </DashboardShell>
  );
}

import { DashboardAiInsights } from "@/components/dashboard/insights";
import { DashboardHero } from "@/components/dashboard/hero";
import { DashboardKpis } from "@/components/dashboard/kpi";
import { DashboardPipelinePreview } from "@/components/dashboard/pipeline";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-6 py-8 lg:px-8 lg:py-10">
          <DashboardHero />
          <DashboardKpis metrics={metrics} />
          <DashboardPipelinePreview stages={stages} />
          <DashboardAiInsights insights={insights} />
        </main>
      </div>
    </div>
  );
}

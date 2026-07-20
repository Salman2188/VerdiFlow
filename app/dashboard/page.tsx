import { DashboardAiInsights } from "@/components/dashboard/insights";
import { DashboardHero } from "@/components/dashboard/hero";
import { DEFAULT_HERO_CONTENT } from "@/components/dashboard/hero/hero-content";
import { DashboardKpis } from "@/components/dashboard/kpi";
import { DashboardPipelinePreview } from "@/components/dashboard/pipeline";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { dashboardPage } from "@/components/dashboard/dashboard-styles";
import { getAuthenticatedNavUser } from "@/lib/auth/profile";
import { requireVerifiedUserForPath } from "@/lib/auth/server";
import { getDashboardPageData } from "@/lib/services/dashboard.service";
import { getTimeGreeting } from "@/lib/utils/greeting";

export const dynamic = "force-dynamic";

function getFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export default async function DashboardPage() {
  const user = await requireVerifiedUserForPath("/dashboard");
  const navUser = await getAuthenticatedNavUser(user);

  const { metrics, stages, insights } = await getDashboardPageData();

  const heroContent = {
    ...DEFAULT_HERO_CONTENT,
    greeting: getTimeGreeting(),
    agentName: getFirstName(navUser.sidebar.name),
  };

  return (
    <DashboardShell pathname="/dashboard" navUser={navUser}>
      <div className={dashboardPage}>
        <DashboardHero content={heroContent} />
        <DashboardKpis metrics={metrics} />
        <DashboardPipelinePreview stages={stages} />
        <DashboardAiInsights insights={insights} />
      </div>
    </DashboardShell>
  );
}

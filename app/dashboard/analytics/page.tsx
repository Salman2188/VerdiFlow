import { AnalyticsWorkspace } from "@/components/dashboard/analytics";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getAnalytics } from "@/lib/services/analytics.service";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <DashboardShell pathname="/dashboard/analytics">
      <AnalyticsWorkspace initialData={data} />
    </DashboardShell>
  );
}

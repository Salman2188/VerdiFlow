import { LeadsWorkspace } from "@/components/dashboard/leads";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getLeads } from "@/lib/services/lead.service";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <DashboardShell pathname="/dashboard/leads">
      <LeadsWorkspace leads={leads} />
    </DashboardShell>
  );
}

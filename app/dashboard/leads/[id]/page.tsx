import { LeadDetailWorkspace } from "@/components/dashboard/lead-detail";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getLeadDetail } from "@/lib/services/lead.service";

export const dynamic = "force-dynamic";

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const detail = await getLeadDetail(id);

  return (
    <DashboardShell pathname={`/dashboard/leads/${id}`}>
      <LeadDetailWorkspace detail={detail} />
    </DashboardShell>
  );
}

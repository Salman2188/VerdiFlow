import { LeadDetailWorkspace } from "@/components/dashboard/lead-detail";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

type LeadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-6 py-8 lg:px-8 lg:py-10">
          <LeadDetailWorkspace leadId={id} />
        </main>
      </div>
    </div>
  );
}

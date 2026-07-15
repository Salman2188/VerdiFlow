import { LeadsWorkspace } from "@/components/dashboard/leads";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { getLeads } from "@/lib/services/lead.service";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-6 py-8 lg:px-8 lg:py-10">
          <LeadsWorkspace leads={leads} />
        </main>
      </div>
    </div>
  );
}

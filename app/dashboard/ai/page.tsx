import { AiAssistantWorkspace } from "@/components/dashboard/ai-assistant";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export default function AiAssistantPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="flex-1 px-6 py-8 lg:px-8 lg:py-10">
          <AiAssistantWorkspace />
        </main>
      </div>
    </div>
  );
}

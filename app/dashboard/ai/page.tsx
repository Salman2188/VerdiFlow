import { AiAssistantWorkspace } from "@/components/dashboard/ai-assistant";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function AiAssistantPage() {
  return (
    <DashboardShell pathname="/dashboard/ai">
      <AiAssistantWorkspace />
    </DashboardShell>
  );
}

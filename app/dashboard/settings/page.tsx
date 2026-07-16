import { SettingsWorkspace } from "@/components/dashboard/settings";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell pathname="/dashboard/settings">
      <SettingsWorkspace />
    </DashboardShell>
  );
}

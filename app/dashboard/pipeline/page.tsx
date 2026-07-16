import { PipelineBoardWorkspace } from "@/components/dashboard/pipeline-board";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getPipelineBoard } from "@/lib/services/pipeline.service";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  const initialBoard = await getPipelineBoard();

  return (
    <DashboardShell pathname="/dashboard/pipeline">
      <PipelineBoardWorkspace initialBoard={initialBoard} />
    </DashboardShell>
  );
}

import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import {
  dashboardPanel,
  dashboardPanelPadding,
  dashboardScrollFade,
  dashboardScrollRow,
} from "@/components/dashboard/dashboard-styles";

import { DEFAULT_PIPELINE_STAGES } from "./pipeline-data";
import { PipelineStageColumn } from "./PipelineStageColumn";
import type { PipelineStage } from "./types";

type DashboardPipelinePreviewProps = {
  stages?: PipelineStage[];
};

export function DashboardPipelinePreview({
  stages = DEFAULT_PIPELINE_STAGES,
}: DashboardPipelinePreviewProps) {
  return (
    <section aria-labelledby="dashboard-pipeline-heading">
      <DashboardSectionHeader
        id="dashboard-pipeline-heading"
        title="Pipeline"
        action={{ label: "Se alle", href: "/dashboard/pipeline" }}
      />

      <div className={`relative ${dashboardPanel} ${dashboardPanelPadding}`}>
        <div className={dashboardScrollRow} tabIndex={0} aria-label="Pipeline-forhåndsvisning">
          {stages.map((stage) => (
            <PipelineStageColumn key={stage.id} stage={stage} />
          ))}
        </div>
        <div className={dashboardScrollFade} aria-hidden="true" />
      </div>
    </section>
  );
}

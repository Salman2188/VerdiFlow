"use client";

import { dashboardPage } from "@/components/dashboard/dashboard-styles";

import { LeadDetailActivityPanel } from "./LeadDetailActivityPanel";
import { LeadDetailAiSummary } from "./LeadDetailAiSummary";
import { LeadDetailHeader } from "./LeadDetailHeader";
import { LeadDetailMetrics } from "./LeadDetailMetrics";
import { LeadDetailNotFound } from "./LeadDetailNotFound";
import { LeadDetailProfile } from "./LeadDetailProfile";
import { LeadDetailProperty } from "./LeadDetailProperty";
import { LeadDetailTasks } from "./LeadDetailTasks";
import { LeadDetailTimeline } from "./LeadDetailTimeline";
import type { LeadDetail } from "./types";

type LeadDetailWorkspaceProps = {
  detail: LeadDetail | null;
};

export function LeadDetailWorkspace({ detail }: LeadDetailWorkspaceProps) {
  if (!detail) {
    return <LeadDetailNotFound />;
  }

  return (
    <div className={dashboardPage}>
      <LeadDetailHeader detail={detail} />

      <LeadDetailAiSummary
        aiSummary={detail.aiSummary}
        nextAction={detail.lead.aiRecommendation}
      />

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <LeadDetailTimeline events={detail.timeline} />
          <LeadDetailActivityPanel
            calls={detail.calls}
            emails={detail.emails}
            messages={detail.messages}
            notes={detail.notes}
            documents={detail.documents}
          />
        </div>

        <div className="space-y-6">
          <LeadDetailMetrics lead={detail.lead} />
          <LeadDetailProfile profile={detail.profile} />
          <LeadDetailProperty property={detail.property} />
          <LeadDetailTasks tasks={detail.tasks} />
        </div>
      </div>
    </div>
  );
}

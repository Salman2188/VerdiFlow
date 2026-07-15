export type FocusTask = {
  id: string;
  priority: number;
  title: string;
  context: string;
  value: string;
};

export type BriefInsight = {
  id: string;
  text: string;
};

export type DashboardHeroContent = {
  agentName: string;
  aiSummary: string;
  focusTasks: FocusTask[];
  briefInsights: BriefInsight[];
};

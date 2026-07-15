export type PipelineStageId = "hot" | "warm" | "active" | "new";

export type PipelineLead = {
  id: string;
  customerName: string;
  property: string;
  status: string;
  lastActivity: string;
  aiRecommendation: string;
  closingProbability: number;
  priority: "Høy" | "Medium" | "Lav";
};

export type PipelineStage = {
  id: PipelineStageId;
  label: string;
  emoji: string;
  leads: PipelineLead[];
};

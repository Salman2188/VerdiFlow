export type InsightPriority = "Høy" | "Medium" | "Lav";

export type AiInsight = {
  id: string;
  title: string;
  explanation: string;
  action: string;
  confidence: number;
  priority?: InsightPriority;
};

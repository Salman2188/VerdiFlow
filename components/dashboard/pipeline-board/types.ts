import type { LeadPriority } from "@/components/dashboard/leads";

export type KanbanColumnId =
  | "nye-leads"
  | "kontaktet"
  | "visning-booket"
  | "bud-sendt"
  | "forhandling"
  | "solgt";

export type KanbanLead = {
  id: string;
  customerName: string;
  property: string;
  aiPriorityScore: number;
  closingProbability: number;
  lastActivity: string;
  aiRecommendation: string;
  priority: LeadPriority;
  columnId: KanbanColumnId;
};

export type KanbanColumn = {
  id: KanbanColumnId;
  label: string;
  emoji: string;
  leads: KanbanLead[];
};

export type KanbanBoard = {
  columns: KanbanColumn[];
};

export type PipelineBoardStats = {
  total: number;
  inNegotiation: number;
  highPriority: number;
  sold: number;
};

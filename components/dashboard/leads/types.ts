export type LeadPriority = "Høy" | "Medium" | "Lav";

export type LeadStageId = "hot" | "warm" | "active" | "new";

export type LeadSource =
  | "Finn.no"
  | "Zett"
  | "Referanse"
  | "Hjemmeside"
  | "Sosiale medier"
  | "Meglertjeneste";

export type Lead = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  property: string;
  propertyType: string;
  status: string;
  stage: LeadStageId;
  source: LeadSource;
  lastActivity: string;
  lastActivityDays: number;
  aiRecommendation: string;
  closingProbability: number;
  aiPriorityScore: number;
  priority: LeadPriority;
  budget: string;
  tags: string[];
};

export type LeadFilterId =
  | "all"
  | "action-today"
  | "ai-prioritized"
  | "inactive"
  | "new-inquiries";

export type LeadFilter = {
  id: LeadFilterId;
  label: string;
  description: string;
};

export type LeadStageFilter = LeadStageId | "all";

export type LeadPriorityFilter = LeadPriority | "all";

export type LeadSourceFilter = LeadSource | "all";

export type LeadsQuery = {
  search: string;
  smartFilter: LeadFilterId;
  stage: LeadStageFilter;
  priority: LeadPriorityFilter;
  source: LeadSourceFilter;
};

export type LeadsStats = {
  total: number;
  requiresAction: number;
  newToday: number;
  averageAiScore: number;
};

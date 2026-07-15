import type { Lead, LeadsQuery, LeadsStats } from "./types";

function matchesSearch(lead: Lead, search: string): boolean {
  if (!search.trim()) return true;

  const query = search.trim().toLowerCase();
  const haystack = [
    lead.customerName,
    lead.property,
    lead.email,
    lead.phone,
    lead.status,
    lead.aiRecommendation,
    ...lead.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function matchesSmartFilter(lead: Lead, filterId: LeadsQuery["smartFilter"]): boolean {
  switch (filterId) {
    case "all":
      return true;
    case "action-today":
      return lead.priority === "Høy" && lead.lastActivityDays <= 1;
    case "ai-prioritized":
      return lead.aiPriorityScore >= 70;
    case "inactive":
      return lead.lastActivityDays >= 7;
    case "new-inquiries":
      return lead.stage === "new" || lead.status === "Ny henvendelse";
    default:
      return true;
  }
}

export function filterLeads(leads: Lead[], query: LeadsQuery): Lead[] {
  return leads
    .filter((lead) => {
      if (!matchesSearch(lead, query.search)) return false;
      if (!matchesSmartFilter(lead, query.smartFilter)) return false;
      if (query.stage !== "all" && lead.stage !== query.stage) return false;
      if (query.priority !== "all" && lead.priority !== query.priority) return false;
      if (query.source !== "all" && lead.source !== query.source) return false;
      return true;
    })
    .sort((a, b) => b.aiPriorityScore - a.aiPriorityScore);
}

export function computeLeadsStats(leads: Lead[]): LeadsStats {
  const requiresAction = leads.filter(
    (lead) => lead.priority === "Høy" && lead.lastActivityDays <= 1,
  ).length;

  const newToday = leads.filter(
    (lead) => lead.stage === "new" && lead.lastActivityDays === 0,
  ).length;

  const averageAiScore =
    leads.length === 0
      ? 0
      : Math.round(
          leads.reduce((sum, lead) => sum + lead.aiPriorityScore, 0) / leads.length,
        );

  return {
    total: leads.length,
    requiresAction,
    newToday,
    averageAiScore,
  };
}

export const DEFAULT_LEADS_QUERY: LeadsQuery = {
  search: "",
  smartFilter: "all",
  stage: "all",
  priority: "all",
  source: "all",
};

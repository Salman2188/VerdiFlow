import { DEFAULT_LEADS } from "@/components/dashboard/leads";
import type { Lead } from "@/components/dashboard/leads";

import type { KanbanBoard, KanbanColumn, KanbanColumnId, KanbanLead } from "./types";

export const KANBAN_COLUMN_DEFS: Omit<KanbanColumn, "leads">[] = [
  { id: "nye-leads", label: "Nye leads", emoji: "⚪" },
  { id: "kontaktet", label: "Kontaktet", emoji: "💬" },
  { id: "visning-booket", label: "Visning booket", emoji: "📅" },
  { id: "bud-sendt", label: "Bud sendt", emoji: "📄" },
  { id: "forhandling", label: "Forhandling", emoji: "🤝" },
  { id: "solgt", label: "Solgt", emoji: "✅" },
];

function inferColumnId(lead: Lead): KanbanColumnId {
  switch (lead.status) {
    case "Ny henvendelse":
      return "nye-leads";
    case "Dialog pågår":
      return "kontaktet";
    case "Visning booket":
      return "visning-booket";
    case "Tilbud sendt":
      return "bud-sendt";
    case "Motbud mottatt":
    case "Under vurdering":
      return "forhandling";
    default:
      if (lead.stage === "new") return "nye-leads";
      if (lead.stage === "warm") return "visning-booket";
      if (lead.stage === "hot") return "bud-sendt";
      return "kontaktet";
  }
}

function leadToKanban(lead: Lead): KanbanLead {
  return {
    id: lead.id,
    customerName: lead.customerName,
    property: lead.property,
    aiPriorityScore: lead.aiPriorityScore,
    closingProbability: lead.closingProbability,
    lastActivity: lead.lastActivity,
    aiRecommendation: lead.aiRecommendation,
    priority: lead.priority,
    columnId: inferColumnId(lead),
  };
}

export function buildInitialBoard(): KanbanBoard {
  const kanbanLeads = DEFAULT_LEADS.map(leadToKanban);

  const columns: KanbanColumn[] = KANBAN_COLUMN_DEFS.map((def) => ({
    ...def,
    leads: kanbanLeads.filter((lead) => lead.columnId === def.id),
  }));

  return { columns };
}

export const DEFAULT_KANBAN_BOARD = buildInitialBoard();

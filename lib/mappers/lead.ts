import type { KanbanColumnId, KanbanLead } from "@/components/dashboard/pipeline-board";
import type { Lead, LeadSource } from "@/components/dashboard/leads";
import type {
  ActivityType,
  LeadCall,
  LeadDetail,
  LeadDocument,
  LeadEmail,
  LeadMessage,
  LeadNote,
  LeadTask,
  TimelineEvent,
} from "@/components/dashboard/lead-detail/types";
import type { ActivityRow, LeadNoteRow, LeadRow, LeadTaskRow } from "@/types/database";
import {
  daysSince,
  formatDueRelative,
  formatNorwegianDate,
  formatRelativeTime,
} from "@/lib/utils/relative-time";

type ActivityMetadata = {
  direction?: "inn" | "ut";
  duration?: string;
  channel?: LeadMessage["channel"];
  subject?: string;
  preview?: string;
  name?: string;
  file_type?: string;
  size?: string;
};

function asMetadata(metadata: ActivityRow["metadata"]): ActivityMetadata {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return {};
  }

  return metadata as ActivityMetadata;
}

export function mapLeadRow(row: LeadRow): Lead {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    property: row.property ?? "",
    propertyType: row.property_type ?? "",
    status: row.status,
    stage: row.stage,
    source: row.source as LeadSource,
    lastActivity: formatRelativeTime(row.last_activity_at),
    lastActivityDays: daysSince(row.last_activity_at),
    aiRecommendation: row.ai_recommendation,
    closingProbability: row.closing_probability,
    aiPriorityScore: row.ai_priority_score,
    priority: row.priority,
    budget: row.budget ?? "",
    tags: row.tags ?? [],
  };
}

export function mapKanbanLead(row: LeadRow): KanbanLead {
  const lead = mapLeadRow(row);

  return {
    id: lead.id,
    customerName: lead.customerName,
    property: lead.property,
    aiPriorityScore: lead.aiPriorityScore,
    closingProbability: lead.closingProbability,
    lastActivity: lead.lastActivity,
    aiRecommendation: lead.aiRecommendation,
    priority: lead.priority,
    columnId: row.pipeline_stage_id as KanbanColumnId,
  };
}

function mapTimelineEvent(activity: ActivityRow): TimelineEvent {
  return {
    id: activity.id,
    type: activity.type as ActivityType,
    title: activity.title,
    description: activity.description ?? "",
    relativeTime: formatRelativeTime(activity.created_at),
    timestamp: activity.created_at,
    actor: activity.actor ?? "System",
  };
}

function mapCall(activity: ActivityRow): LeadCall {
  const metadata = asMetadata(activity.metadata);

  return {
    id: activity.id,
    direction: metadata.direction ?? "ut",
    duration: metadata.duration ?? "—",
    summary: activity.description ?? activity.title,
    relativeTime: formatRelativeTime(activity.created_at),
    timestamp: activity.created_at,
  };
}

function mapEmail(activity: ActivityRow): LeadEmail {
  const metadata = asMetadata(activity.metadata);

  return {
    id: activity.id,
    subject: metadata.subject ?? activity.title,
    preview: metadata.preview ?? activity.description ?? "",
    direction: metadata.direction ?? "ut",
    relativeTime: formatRelativeTime(activity.created_at),
    timestamp: activity.created_at,
  };
}

function mapMessage(activity: ActivityRow): LeadMessage {
  const metadata = asMetadata(activity.metadata);

  return {
    id: activity.id,
    channel: metadata.channel ?? "SMS",
    content: activity.description ?? activity.title,
    direction: metadata.direction ?? "inn",
    relativeTime: formatRelativeTime(activity.created_at),
    timestamp: activity.created_at,
  };
}

function mapDocument(activity: ActivityRow): LeadDocument {
  const metadata = asMetadata(activity.metadata);

  return {
    id: activity.id,
    name: metadata.name ?? activity.title,
    type: metadata.file_type ?? "Dokument",
    size: metadata.size ?? "—",
    relativeTime: formatRelativeTime(activity.created_at),
    timestamp: activity.created_at,
  };
}

function mapNote(note: LeadNoteRow): LeadNote {
  return {
    id: note.id,
    content: note.content,
    author: note.author,
    relativeTime: formatRelativeTime(note.created_at),
    timestamp: note.created_at,
  };
}

function mapTask(task: LeadTaskRow): LeadTask {
  return {
    id: task.id,
    title: task.title,
    dueRelative: formatDueRelative(task.due_date, task.completed),
    dueDate: task.due_date ? formatNorwegianDate(task.due_date) : "—",
    priority: task.priority,
    completed: task.completed,
  };
}

function buildFallbackDetail(row: LeadRow): LeadDetail {
  const lead = mapLeadRow(row);
  const municipality =
    row.municipality ??
    (lead.property.includes(",") ? lead.property.split(", ").slice(1).join(", ") : "Norge");

  return {
    lead,
    profile: {
      name: lead.customerName,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      tags: lead.tags,
      createdAt: formatNorwegianDate(row.created_at),
      preferredContact: (row.preferred_contact as "Telefon" | "E-post" | "SMS") ?? "Telefon",
      buyerType: row.buyer_type ?? "Ikke spesifisert",
      financing: row.financing ?? "Under vurdering",
    },
    property: {
      address: lead.property,
      type: lead.propertyType,
      size: row.property_size ?? "—",
      rooms: row.property_rooms ?? "—",
      yearBuilt: row.year_built ?? "—",
      askingPrice: row.asking_price ?? "—",
      budget: lead.budget,
      municipality,
      viewingDate: row.viewing_date ? formatNorwegianDate(row.viewing_date) : undefined,
    },
    aiSummary: {
      headline: row.ai_summary_headline ?? `${lead.status} — AI-score ${lead.aiPriorityScore}`,
      summary: row.ai_summary_text ?? lead.aiRecommendation,
      keyInsights:
        row.ai_key_insights.length > 0
          ? row.ai_key_insights
          : [
              `Lukkingssannsynlighet: ${lead.closingProbability}%`,
              `Sist aktiv: ${lead.lastActivity}`,
              `Kilde: ${lead.source}`,
            ],
      urgency: lead.priority,
      confidence: row.ai_confidence ?? lead.aiPriorityScore,
    },
    timeline: [
      {
        id: `${lead.id}-tl-status`,
        type: "status",
        title: lead.status,
        description: lead.aiRecommendation,
        relativeTime: lead.lastActivity,
        timestamp: row.last_activity_at,
        actor: "System",
      },
    ],
    calls: [],
    emails: [],
    messages: [],
    notes: [],
    documents: [],
    tasks: [
      {
        id: `${lead.id}-task-default`,
        title: lead.aiRecommendation,
        dueRelative: "I dag",
        dueDate: "—",
        priority: lead.priority,
        completed: false,
      },
    ],
  };
}

export function mapLeadDetail(
  row: LeadRow,
  notes: LeadNoteRow[],
  tasks: LeadTaskRow[],
  activities: ActivityRow[],
): LeadDetail {
  const hasExtendedData =
    notes.length > 0 ||
    tasks.length > 0 ||
    activities.length > 0 ||
    Boolean(row.ai_summary_headline) ||
    Boolean(row.buyer_type);

  if (!hasExtendedData) {
    return buildFallbackDetail(row);
  }

  const lead = mapLeadRow(row);
  const municipality = row.municipality ?? "Norge";

  const timelineFromActivities = activities.map(mapTimelineEvent);
  const timelineFromNotes: TimelineEvent[] = notes.map((note) => ({
    id: note.id,
    type: "note",
    title: "Notat lagt til",
    description: note.content,
    relativeTime: formatRelativeTime(note.created_at),
    timestamp: note.created_at,
    actor: note.author,
  }));

  const timeline = [...timelineFromActivities, ...timelineFromNotes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return {
    lead,
    profile: {
      name: lead.customerName,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      tags: lead.tags,
      createdAt: formatNorwegianDate(row.created_at),
      preferredContact: (row.preferred_contact as "Telefon" | "E-post" | "SMS") ?? "Telefon",
      buyerType: row.buyer_type ?? "Ikke spesifisert",
      financing: row.financing ?? "Under vurdering",
    },
    property: {
      address: lead.property,
      type: lead.propertyType,
      size: row.property_size ?? "—",
      rooms: row.property_rooms ?? "—",
      yearBuilt: row.year_built ?? "—",
      askingPrice: row.asking_price ?? "—",
      budget: lead.budget,
      municipality,
      viewingDate: row.viewing_date ? formatNorwegianDate(row.viewing_date) : undefined,
    },
    aiSummary: {
      headline: row.ai_summary_headline ?? `${lead.status} — AI-score ${lead.aiPriorityScore}`,
      summary: row.ai_summary_text ?? lead.aiRecommendation,
      keyInsights:
        row.ai_key_insights.length > 0
          ? row.ai_key_insights
          : [
              `Lukkingssannsynlighet: ${lead.closingProbability}%`,
              `Sist aktiv: ${lead.lastActivity}`,
              `Kilde: ${lead.source}`,
            ],
      urgency: lead.priority,
      confidence: row.ai_confidence ?? lead.aiPriorityScore,
    },
    timeline:
      timeline.length > 0
        ? timeline
        : buildFallbackDetail(row).timeline,
    calls: activities.filter((item) => item.type === "call").map(mapCall),
    emails: activities.filter((item) => item.type === "email").map(mapEmail),
    messages: activities.filter((item) => item.type === "message").map(mapMessage),
    documents: activities.filter((item) => item.type === "document").map(mapDocument),
    notes: notes.map(mapNote),
    tasks: tasks.length > 0 ? tasks.map(mapTask) : buildFallbackDetail(row).tasks,
  };
}

export function parseBudgetMillions(budget: string | null): number {
  if (!budget) {
    return 0;
  }

  const numbers = budget.match(/[\d]+(?:[.,]\d+)?/g);
  if (!numbers || numbers.length === 0) {
    return 0;
  }

  const values = numbers.map((value) => parseFloat(value.replace(",", ".")));
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return average;
}

export function formatMillions(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}M kr`;
}

export function formatCurrency(value: number): string {
  return `${value.toLocaleString("nb-NO", { maximumFractionDigits: 1 })}M kr`;
}

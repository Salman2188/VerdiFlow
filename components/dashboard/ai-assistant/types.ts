import type { LeadPriority } from "@/components/dashboard/leads";

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp: string;
};

export type QuickActionId =
  | "summarize-day"
  | "prioritize-leads"
  | "write-followup"
  | "sales-forecast"
  | "plan-day"
  | "weekly-report";

export type QuickAction = {
  id: QuickActionId;
  label: string;
  description: string;
};

export type AiRecommendation = {
  id: string;
  customerName: string;
  leadId: string;
  reason: string;
  action: string;
  confidence: number;
  priority: LeadPriority;
};

export type GeneratedMessageType = "sms" | "email" | "followup";

export type GeneratedMessage = {
  id: string;
  type: GeneratedMessageType;
  recipient: string;
  subject?: string;
  preview: string;
  status: "draft" | "ready";
  relativeTime: string;
};

export type AiAlertSeverity = "high" | "medium" | "low";

export type AiAlert = {
  id: string;
  title: string;
  description: string;
  severity: AiAlertSeverity;
  relativeTime: string;
  actionLabel: string;
};

export type AiDailySummaryData = {
  headline: string;
  completedAutomations: number;
  savedTimeHours: number;
  draftsPending: number;
  recommendedFocus: string[];
};

export type AiAssistantData = {
  chatMessages: ChatMessage[];
  quickActions: QuickAction[];
  recommendations: AiRecommendation[];
  generatedMessages: GeneratedMessage[];
  alerts: AiAlert[];
  dailySummary: AiDailySummaryData;
};

export const QUICK_ACTION_RESPONSES: Record<QuickActionId, string> = {
  "summarize-day":
    "Du har 7 leads som krever handling i dag. Jennifer Walsh (94 AI-score) og Petra & Ole Haugen (92) bør kontaktes før kl. 11. 3 visninger er booket, og 2 bud venter på svar.",
  "prioritize-leads":
    "Topp 3 prioriteter: 1) Jennifer Walsh — motbud utløper i dag. 2) Petra & Ole Haugen — ny lead, ring innen 30 min. 3) Lisa & David Park — AI-utkast til motbudssvar er klart.",
  "write-followup":
    "Jeg har forberedt 4 oppfølgningsutkast: 2 e-poster, 1 SMS og 1 visningsbekreftelse. Se seksjonen «AI-genererte meldinger» for forhåndsvisning.",
  "sales-forecast":
    "Basert på pipeline og konverteringsrate anslår jeg 4,2M kr i lukket volum denne måneden. Du er 18 % over mål hvis du lukker de 3 høyest prioriterte leads.",
  "plan-day":
    "Foreslått plan: 09:00 Ring Petra & Ole Haugen. 10:30 Svar Jennifer Walsh motbud. 12:00 Visning Michael Torres. 14:00 Oppfølging Lisa & David Park. 16:00 Ukesrapport.",
  "weekly-report":
    "Ukerapport klar: 12 aktive leads, 3 nye henvendelser, 2 visninger booket, 1 tilbud sendt. AI sparte deg 14 timer denne uken. Konverteringsrate: +8 % vs. forrige uke.",
};

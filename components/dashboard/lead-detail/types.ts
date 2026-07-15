import type { Lead, LeadPriority, LeadSource } from "@/components/dashboard/leads";

export type ActivityType = "call" | "email" | "message" | "note" | "document" | "task" | "status";

export type TimelineEvent = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  relativeTime: string;
  timestamp: string;
  actor: string;
};

export type LeadCall = {
  id: string;
  direction: "inn" | "ut";
  duration: string;
  summary: string;
  relativeTime: string;
  timestamp: string;
};

export type LeadEmail = {
  id: string;
  subject: string;
  preview: string;
  direction: "inn" | "ut";
  relativeTime: string;
  timestamp: string;
};

export type LeadMessage = {
  id: string;
  channel: "SMS" | "WhatsApp" | "Finn.no" | "Instagram";
  content: string;
  direction: "inn" | "ut";
  relativeTime: string;
  timestamp: string;
};

export type LeadNote = {
  id: string;
  content: string;
  author: string;
  relativeTime: string;
  timestamp: string;
};

export type LeadDocument = {
  id: string;
  name: string;
  type: string;
  size: string;
  relativeTime: string;
  timestamp: string;
};

export type LeadTask = {
  id: string;
  title: string;
  dueRelative: string;
  dueDate: string;
  priority: LeadPriority;
  completed: boolean;
};

export type LeadCustomerProfile = {
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  tags: string[];
  createdAt: string;
  preferredContact: "Telefon" | "E-post" | "SMS";
  buyerType: string;
  financing: string;
};

export type LeadPropertyDetail = {
  address: string;
  type: string;
  size: string;
  rooms: string;
  yearBuilt: string;
  askingPrice: string;
  budget: string;
  municipality: string;
  viewingDate?: string;
};

export type LeadAiSummary = {
  headline: string;
  summary: string;
  keyInsights: string[];
  urgency: LeadPriority;
  confidence: number;
};

export type LeadDetail = {
  lead: Lead;
  profile: LeadCustomerProfile;
  property: LeadPropertyDetail;
  aiSummary: LeadAiSummary;
  timeline: TimelineEvent[];
  calls: LeadCall[];
  emails: LeadEmail[];
  messages: LeadMessage[];
  notes: LeadNote[];
  documents: LeadDocument[];
  tasks: LeadTask[];
};

export type ActivityTabId = "calls" | "emails" | "messages" | "notes" | "documents";

export type ActivityTab = {
  id: ActivityTabId;
  label: string;
  count: number;
};

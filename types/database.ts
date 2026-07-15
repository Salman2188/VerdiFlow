export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LeadStage = "hot" | "warm" | "active" | "new";
export type LeadPriority = "Høy" | "Medium" | "Lav";
export type ActivityType =
  | "call"
  | "email"
  | "message"
  | "note"
  | "document"
  | "task"
  | "status";

export type ProfileRow = {
  id: string;
  full_name: string;
  email: string | null;
  agency: string | null;
  avatar_url: string | null;
  role: string;
  closed_deals: number;
  pipeline_value: number;
  conversion_rate: number;
  ai_score: number;
  is_top_performer: boolean;
  created_at: string;
  updated_at: string;
};

export type PipelineStageRow = {
  id: string;
  label: string;
  emoji: string;
  sort_order: number;
  stage_group: LeadStage;
};

export type LeadRow = {
  id: string;
  customer_name: string;
  email: string | null;
  phone: string | null;
  property: string | null;
  property_type: string | null;
  status: string;
  stage: LeadStage;
  source: string;
  last_activity_at: string;
  ai_recommendation: string;
  closing_probability: number;
  ai_priority_score: number;
  priority: LeadPriority;
  budget: string | null;
  tags: string[];
  pipeline_stage_id: string;
  assigned_to: string | null;
  preferred_contact: string | null;
  buyer_type: string | null;
  financing: string | null;
  property_size: string | null;
  property_rooms: string | null;
  year_built: string | null;
  asking_price: string | null;
  municipality: string | null;
  viewing_date: string | null;
  ai_summary_headline: string | null;
  ai_summary_text: string | null;
  ai_key_insights: string[];
  ai_confidence: number | null;
  created_at: string;
  updated_at: string;
};

export type LeadNoteRow = {
  id: string;
  lead_id: string;
  content: string;
  author: string;
  created_at: string;
};

export type LeadTaskRow = {
  id: string;
  lead_id: string;
  title: string;
  due_date: string | null;
  priority: LeadPriority;
  completed: boolean;
  created_at: string;
};

export type ActivityRow = {
  id: string;
  lead_id: string;
  type: ActivityType;
  title: string;
  description: string | null;
  actor: string | null;
  metadata: Json;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & Pick<ProfileRow, "full_name">;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      pipeline_stages: {
        Row: PipelineStageRow;
        Insert: PipelineStageRow;
        Update: Partial<PipelineStageRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Partial<LeadRow> & Pick<LeadRow, "id" | "customer_name" | "status" | "stage" | "source" | "pipeline_stage_id">;
        Update: Partial<LeadRow>;
        Relationships: [
          {
            foreignKeyName: "leads_pipeline_stage_id_fkey";
            columns: ["pipeline_stage_id"];
            referencedRelation: "pipeline_stages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_notes: {
        Row: LeadNoteRow;
        Insert: Partial<LeadNoteRow> & Pick<LeadNoteRow, "lead_id" | "content" | "author">;
        Update: Partial<LeadNoteRow>;
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_tasks: {
        Row: LeadTaskRow;
        Insert: Partial<LeadTaskRow> & Pick<LeadTaskRow, "lead_id" | "title">;
        Update: Partial<LeadTaskRow>;
        Relationships: [
          {
            foreignKeyName: "lead_tasks_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      activities: {
        Row: ActivityRow;
        Insert: Partial<ActivityRow> & Pick<ActivityRow, "lead_id" | "type" | "title">;
        Update: Partial<ActivityRow>;
        Relationships: [
          {
            foreignKeyName: "activities_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lead_stage: LeadStage;
      lead_priority: LeadPriority;
      activity_type: ActivityType;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type CompanySettings = {
  name: string;
  logoInitials: string;
  phone: string;
  email: string;
  address: string;
  orgNumber: string;
};

export type ProfileSettings = {
  name: string;
  role: string;
  phone: string;
  email: string;
  language: string;
  avatarInitials: string;
};

export type AiTone = "profesjonell" | "vennlig" | "direkte";
export type AiAggressiveness = "lav" | "moderat" | "høy";

export type AiSettings = {
  aggressiveness: AiAggressiveness;
  tone: AiTone;
  automaticFollowups: boolean;
  automaticReminders: boolean;
  dailyBriefing: boolean;
  weeklyReport: boolean;
  confidenceThreshold: number;
};

export type NotificationSettings = {
  email: boolean;
  sms: boolean;
  push: boolean;
  desktop: boolean;
  leadAlerts: boolean;
  highPriorityAlerts: boolean;
  meetingReminders: boolean;
};

export type IntegrationId =
  | "instagram"
  | "manychat"
  | "make"
  | "supabase"
  | "google-calendar"
  | "outlook";

export type Integration = {
  id: IntegrationId;
  name: string;
  description: string;
  connected: boolean;
  lastSync: string;
  status: "aktiv" | "feil" | "ikke tilkoblet";
};

export type SecuritySettings = {
  twoFactorEnabled: boolean;
  activeSessions: number;
  activeDevices: string[];
  lastLogin: string;
  lastLoginLocation: string;
};

export type SubscriptionPlan = {
  name: string;
  price: string;
  nextPayment: string;
  features: string[];
};

export type SettingsData = {
  company: CompanySettings;
  profile: ProfileSettings;
  ai: AiSettings;
  notifications: NotificationSettings;
  integrations: Integration[];
  security: SecuritySettings;
  subscription: SubscriptionPlan;
};

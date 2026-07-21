export type DashboardPageMeta = {
  title: string;
  description: string;
  label?: string;
};

export const DASHBOARD_PAGE_META: Record<string, DashboardPageMeta> = {
  "/dashboard": {
    title: "Oversikt",
    description: "Dagens viktigste tall, fokus og muligheter — prioritert av AI.",
    label: "Kommandosenter",
  },
  "/dashboard/leads": {
    title: "Leads",
    description: "Hvem bør du kontakte nå for å lukke flere avtaler?",
    label: "Arbeidsområde",
  },
  "/dashboard/pipeline": {
    title: "Pipeline",
    description: "Se hele salgsprosessen og flytt deals fremover.",
    label: "Arbeidsområde",
  },
  "/dashboard/analytics": {
    title: "Analyse",
    description: "Salgsytelse, AI-effektivitet og utvikling i pipeline.",
    label: "Arbeidsområde",
  },
  "/dashboard/ai": {
    title: "AI-assistent",
    description: "Spør, planlegg og utfør — AI håndterer resten.",
    label: "Intelligent kjerne",
  },
  "/dashboard/settings": {
    title: "Innstillinger",
    description: "Konto, AI, varsler og integrasjoner.",
    label: "Arbeidsområde",
  },
};

export function getDashboardPageMeta(pathname: string): DashboardPageMeta {
  if (DASHBOARD_PAGE_META[pathname]) {
    return DASHBOARD_PAGE_META[pathname];
  }

  if (pathname.startsWith("/dashboard/leads/")) {
    return {
      title: "Lead Intelligence",
      description: "Full kontekst, aktivitet og AI-anbefalinger for denne leaden.",
      label: "Intelligent kjerne",
    };
  }

  return DASHBOARD_PAGE_META["/dashboard"];
}

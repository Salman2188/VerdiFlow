import type { AiInsight } from "./types";

export const DEFAULT_AI_INSIGHTS: AiInsight[] = [
  {
    id: "1",
    title: "Høyeste prioritetsmulighet",
    explanation:
      "Jennifer Walsh har 78 % lukkingssannsynlighet og åpnet tilbudsdokumentet to ganger i natt.",
    action: "Send personlig oppfølging på motbud innen kl. 12:00.",
    confidence: 92,
    priority: "Høy",
  },
  {
    id: "2",
    title: "Neste lead å kontakte",
    explanation:
      "Michael Torres bekreftet visning i morgen, men har ikke mottatt forberedelsesmateriell.",
    action: "Send visningsbrief og prisargument før kl. 18:00 i dag.",
    confidence: 87,
    priority: "Høy",
  },
  {
    id: "3",
    title: "Lead mister engasjement",
    explanation:
      "Erik Johansen har ikke respondert på 3 oppfølginger de siste 10 dagene.",
    action: "Bytt til telefonoppfølging med ny verdi-vinkel denne uken.",
    confidence: 81,
    priority: "Medium",
  },
  {
    id: "4",
    title: "Estimert månedlig omsetning",
    explanation:
      "Basert på pipeline-verdi, konverteringsrate og sesongtrend anslår AI 4,2M kr i lukket volum.",
    action: "Fokuser på 3 hot leads for å nå prognosen med margin.",
    confidence: 76,
  },
  {
    id: "5",
    title: "Tid spart gjennom automatisering",
    explanation:
      "AI genererte 18 oppfølginger og 6 påminnelser denne uken — tilsvarende 14 timer spart.",
    action: "Gjennomgå 4 AI-utkast som venter på godkjenning i dag.",
    confidence: 94,
    priority: "Medium",
  },
];

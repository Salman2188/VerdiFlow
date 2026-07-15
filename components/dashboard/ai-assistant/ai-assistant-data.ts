import type { AiAssistantData, QuickAction } from "./types";

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "summarize-day",
    label: "Oppsummer dagen",
    description: "Få en rask oversikt over dagens prioriteringer",
  },
  {
    id: "prioritize-leads",
    label: "Prioriter leads",
    description: "AI rangerer hvem du bør kontakte først",
  },
  {
    id: "write-followup",
    label: "Skriv oppfølging",
    description: "Generer personlige oppfølgingsutkast",
  },
  {
    id: "sales-forecast",
    label: "Salgsprognose",
    description: "Månedlig volum basert på pipeline",
  },
  {
    id: "plan-day",
    label: "Planlegg dagen",
    description: "Optimal timeplan for maksimal effekt",
  },
  {
    id: "weekly-report",
    label: "Ukesrapport",
    description: "Ukentlig oppsummering og innsikt",
  },
];

export const DEFAULT_AI_ASSISTANT_DATA: AiAssistantData = {
  dailySummary: {
    headline: "AI har analysert dagen din — 7 handlinger anbefales før kl. 15",
    completedAutomations: 24,
    savedTimeHours: 3.5,
    draftsPending: 4,
    recommendedFocus: [
      "Svar Jennifer Walsh på motbud innen kl. 12",
      "Ring Petra & Ole Haugen — ny premium lead",
      "Bekreft visning med Thomas & Marie Holm",
    ],
  },
  chatMessages: [
    {
      id: "msg-1",
      role: "assistant",
      content:
        "God morgen, Alex. Jeg har analysert 12 aktive leads og 6 pipeline-faser. Du har 7 høyprioriterte handlinger i dag — vil du at jeg oppsummerer dagen eller prioriterer leads først?",
      timestamp: "08:02",
    },
    {
      id: "msg-2",
      role: "user",
      content: "Hvem bør jeg ringe først?",
      timestamp: "08:05",
    },
    {
      id: "msg-3",
      role: "assistant",
      content:
        "Start med Petra & Ole Haugen (AI-score 92). De sendte kontaktskjema for 45 min siden — responstid under 1 time gir 3x høyere konvertering. Deretter Jennifer Walsh — motbud utløper i dag med 78 % lukkingssannsynlighet.",
      timestamp: "08:05",
    },
  ],
  quickActions: DEFAULT_QUICK_ACTIONS,
  recommendations: [
    {
      id: "rec-1",
      customerName: "Jennifer Walsh",
      leadId: "lead-1",
      reason:
        "Motbud mottatt for 2 timer siden. Hun åpnet tilbudsdokumentet to ganger i natt — sterkt kjøpsignal.",
      action: "Send personlig oppfølging på motbud innen kl. 12.",
      confidence: 94,
      priority: "Høy",
    },
    {
      id: "rec-2",
      customerName: "Petra & Ole Haugen",
      leadId: "lead-12",
      reason:
        "Ny lead fra kontaktskjema for 45 min siden. Premium segment (11–12 mill) med høy konverteringssannsynlighet ved rask respons.",
      action: "Ring nå mens interessen er på topp.",
      confidence: 92,
      priority: "Høy",
    },
    {
      id: "rec-3",
      customerName: "Thomas & Marie Holm",
      leadId: "lead-7",
      reason:
        "Visning booket i morgen, men har ikke mottatt forberedelsesmail. Lignende objekter i området solgt 4 % over prisantydning.",
      action: "Send forberedelsesmail med nabolagsinfo og prisargument.",
      confidence: 86,
      priority: "Høy",
    },
    {
      id: "rec-4",
      customerName: "Camilla Røstad",
      leadId: "lead-10",
      reason:
        "Inaktiv i 9 dager. AI detekterer risiko for tap til konkurrent. Tidligere engasjement var høyt.",
      action: "Reaktiver med personlig markedsoppdatering denne uken.",
      confidence: 78,
      priority: "Medium",
    },
  ],
  generatedMessages: [
    {
      id: "gen-1",
      type: "email",
      recipient: "Jennifer Walsh",
      subject: "Angående motbud — Eikeveien 14",
      preview:
        "Hei Jennifer, takk for motbudet på 8,7 mill. Jeg har diskutert med selger og vil gjerne foreslå et møte for å finne en løsning som fungerer for begge parter...",
      status: "ready",
      relativeTime: "10 min siden",
    },
    {
      id: "gen-2",
      type: "sms",
      recipient: "Petra & Ole Haugen",
      preview:
        "Hei Petra! Takk for henvendelsen om Solheimsveien 44. Jeg ringer deg om 10 minutter for å høre mer om hva dere leter etter. Mvh Alex",
      status: "ready",
      relativeTime: "25 min siden",
    },
    {
      id: "gen-3",
      type: "followup",
      recipient: "Thomas & Marie Holm",
      subject: "Forberedelse til visning — Skogveien 17",
      preview:
        "Visningsbrief med nabolagsprofil, solgte lignende objekter og svar på typiske spørsmål. Inkluderer parkeringsinfo og skolenummer.",
      status: "draft",
      relativeTime: "1t siden",
    },
    {
      id: "gen-4",
      type: "email",
      recipient: "Lisa & David Park",
      subject: "Svar på motbud — Bjerkveien 8",
      preview:
        "Kjære Lisa og David, jeg har gjennomgått motbudet deres og forberedt et svar som balanserer selgers forventninger med deres budsjett...",
      status: "draft",
      relativeTime: "2t siden",
    },
  ],
  alerts: [
    {
      id: "alert-1",
      title: "Motbud utløper i dag",
      description: "Jennifer Walsh — svar på motbud innen kl. 17 for å beholde forhandlingsposisjon.",
      severity: "high",
      relativeTime: "2t siden",
      actionLabel: "Åpne lead",
    },
    {
      id: "alert-2",
      title: "Ny lead venter på svar",
      description: "Petra & Ole Haugen sendte kontaktskjema for 45 min siden. Responstid påvirker konvertering.",
      severity: "high",
      relativeTime: "45m siden",
      actionLabel: "Ring nå",
    },
    {
      id: "alert-3",
      title: "Visning i morgen — mangler forberedelse",
      description: "Thomas & Marie Holm har ikke mottatt visningsbrief. Anbefalt å sende innen kl. 18.",
      severity: "medium",
      relativeTime: "4t siden",
      actionLabel: "Send brief",
    },
    {
      id: "alert-4",
      title: "Lead risikerer å bli kald",
      description: "Camilla Røstad — 9 dager uten kontakt. AI anbefaler reaktivering.",
      severity: "medium",
      relativeTime: "1d siden",
      actionLabel: "Reaktiver",
    },
  ],
};

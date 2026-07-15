import type { PipelineStage } from "./types";

export const DEFAULT_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "hot",
    label: "Hot",
    emoji: "🔥",
    leads: [
      {
        id: "hot-1",
        customerName: "Jennifer Walsh",
        property: "Eikeveien 14, Oslo",
        status: "Tilbud sendt",
        lastActivity: "2t siden",
        aiRecommendation: "Send personlig oppfølging på motbud innen kl. 12.",
        closingProbability: 78,
        priority: "Høy",
      },
      {
        id: "hot-2",
        customerName: "Lisa & David Park",
        property: "Bjerkveien 8, Bærum",
        status: "Motbud mottatt",
        lastActivity: "5t siden",
        aiRecommendation: "AI-utkast til svar er klart — gjennomgå og send.",
        closingProbability: 72,
        priority: "Høy",
      },
    ],
  },
  {
    id: "warm",
    label: "Warm",
    emoji: "🟠",
    leads: [
      {
        id: "warm-1",
        customerName: "Michael Torres",
        property: "Maple Dr 42, Asker",
        status: "Visning booket",
        lastActivity: "18t siden",
        aiRecommendation: "Bekreft visning og forbered prisargument.",
        closingProbability: 54,
        priority: "Medium",
      },
    ],
  },
  {
    id: "active",
    label: "Active",
    emoji: "🟢",
    leads: [
      {
        id: "active-1",
        customerName: "Erik Johansen",
        property: "Strandpromenaden 3, Drammen",
        status: "Under vurdering",
        lastActivity: "1d siden",
        aiRecommendation: "Del nylig solgt lignende objekt for å skape urgency.",
        closingProbability: 41,
        priority: "Medium",
      },
      {
        id: "active-2",
        customerName: "Nina Berg",
        property: "Kirkegata 22, Trondheim",
        status: "Dialog pågår",
        lastActivity: "2d siden",
        aiRecommendation: "Planlegg oppfølgingssamtale denne uken.",
        closingProbability: 38,
        priority: "Lav",
      },
    ],
  },
  {
    id: "new",
    label: "New",
    emoji: "⚪",
    leads: [
      {
        id: "new-1",
        customerName: "Anders & Kari Nilsen",
        property: "Finn.no — Lillestrøm",
        status: "Ny henvendelse",
        lastActivity: "3t siden",
        aiRecommendation: "Ring innen 30 min for høyest konvertering.",
        closingProbability: 22,
        priority: "Høy",
      },
    ],
  },
];

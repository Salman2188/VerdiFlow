import { DEFAULT_LEADS } from "@/components/dashboard/leads";
import type { Lead } from "@/components/dashboard/leads";

import type { LeadDetail } from "./types";

const JENNIFER_WALSH_DETAIL: LeadDetail = {
  lead: DEFAULT_LEADS[0],
  profile: {
    name: "Jennifer Walsh",
    email: "jennifer.walsh@email.no",
    phone: "+47 412 33 891",
    source: "Finn.no",
    tags: ["Motbud", "Haster", "Premium"],
    createdAt: "12. mars 2026",
    preferredContact: "Telefon",
    buyerType: "Flytting fra utlandet",
    financing: "Godkjent lån — DNB",
  },
  property: {
    address: "Eikeveien 14, Oslo",
    type: "Enebolig",
    size: "185 m²",
    rooms: "5 rom / 3 soverom",
    yearBuilt: "2018",
    askingPrice: "8 950 000 kr",
    budget: "8,5–9,2 mill",
    municipality: "Oslo — Ullern",
    viewingDate: "10. mars 2026",
  },
  aiSummary: {
    headline: "Motbud mottatt — høy sannsynlighet for lukking denne uken",
    summary:
      "Jennifer er svært motivert og har godkjent finansiering. Hun motsatte seg med 8,7 mill. etter visning i går. Konkurrerende bud fra annen megler utløper torsdag. Rask, personlig oppfølging er avgjørende.",
    keyInsights: [
      "Har sett 4 lignende objekter — Eikeveien er favoritt",
      "Responserer best på telefon mellom 09–11",
      "Bekymret for felleskostnader — adresser dette i neste samtale",
      "Partner godkjenner endelig beslutning — begge bør involveres",
    ],
    urgency: "Høy",
    confidence: 92,
  },
  timeline: [
    {
      id: "tl-1",
      type: "status",
      title: "Motbud mottatt",
      description: "Kunden motsatte seg med 8 700 000 kr. AI anbefaler svar innen 4 timer.",
      relativeTime: "2t siden",
      timestamp: "2026-03-14T18:30:00",
      actor: "System",
    },
    {
      id: "tl-2",
      type: "call",
      title: "Utgående samtale — 12 min",
      description: "Diskuterte felleskostnader og nabolag. Kunden ønsker å legge inn motbud.",
      relativeTime: "5t siden",
      timestamp: "2026-03-14T15:00:00",
      actor: "Alex Rivera",
    },
    {
      id: "tl-3",
      type: "email",
      title: "E-post sendt: Takk for visning",
      description: "Oppfølgingsmail med nabolagsinfo og lignende solgte objekter.",
      relativeTime: "1d siden",
      timestamp: "2026-03-13T16:00:00",
      actor: "Alex Rivera",
    },
    {
      id: "tl-4",
      type: "task",
      title: "Visning gjennomført",
      description: "Kunden møtte opp med partner. Positiv tilstand og beliggenhet.",
      relativeTime: "2d siden",
      timestamp: "2026-03-12T11:00:00",
      actor: "Alex Rivera",
    },
    {
      id: "tl-5",
      type: "message",
      title: "SMS mottatt",
      description: "«Vi er veldig interesserte — kan vi få til visning i helgen?»",
      relativeTime: "4d siden",
      timestamp: "2026-03-10T09:15:00",
      actor: "Jennifer Walsh",
    },
    {
      id: "tl-6",
      type: "note",
      title: "Notat lagt til",
      description: "Flytter fra London Q2. Har barn i skoleplass-alder — nærhet til skole viktig.",
      relativeTime: "5d siden",
      timestamp: "2026-03-09T14:00:00",
      actor: "Alex Rivera",
    },
    {
      id: "tl-7",
      type: "document",
      title: "Finansieringsbevis lastet opp",
      description: "DNB — lån inntil 9,2 mill. godkjent.",
      relativeTime: "6d siden",
      timestamp: "2026-03-08T10:30:00",
      actor: "Jennifer Walsh",
    },
    {
      id: "tl-8",
      type: "call",
      title: "Innkommende samtale — 8 min",
      description: "Første kontakt via Finn.no. Kunden spurte om visning og prisforhandling.",
      relativeTime: "8d siden",
      timestamp: "2026-03-06T13:45:00",
      actor: "Jennifer Walsh",
    },
  ],
  calls: [
    {
      id: "call-1",
      direction: "ut",
      duration: "12 min",
      summary: "Diskuterte felleskostnader og nabolag. Kunden klar for motbud.",
      relativeTime: "5t siden",
      timestamp: "2026-03-14T15:00:00",
    },
    {
      id: "call-2",
      direction: "inn",
      duration: "8 min",
      summary: "Første kontakt. Interesse for visning og prisforhandling.",
      relativeTime: "8d siden",
      timestamp: "2026-03-06T13:45:00",
    },
    {
      id: "call-3",
      direction: "ut",
      duration: "5 min",
      summary: "Bekreftet visningstid og sendte veibeskrivelse.",
      relativeTime: "3d siden",
      timestamp: "2026-03-11T10:00:00",
    },
  ],
  emails: [
    {
      id: "email-1",
      subject: "Takk for visning — Eikeveien 14",
      preview: "Hei Jennifer, takk for en hyggelig visning i dag. Vedlagt finner du...",
      direction: "ut",
      relativeTime: "1d siden",
      timestamp: "2026-03-13T16:00:00",
    },
    {
      id: "email-2",
      subject: "Re: Visning Eikeveien 14",
      preview: "Tusen takk! Vi er veldig begeistret. Har dere mottatt andre bud?",
      direction: "inn",
      relativeTime: "1d siden",
      timestamp: "2026-03-13T19:30:00",
    },
    {
      id: "email-3",
      subject: "Velkommen — din eiendomssøk",
      preview: "Hei Jennifer, takk for henvendelsen via Finn.no. Jeg har funnet...",
      direction: "ut",
      relativeTime: "8d siden",
      timestamp: "2026-03-06T14:00:00",
    },
  ],
  messages: [
    {
      id: "msg-1",
      channel: "SMS",
      content: "Hei Alex, vi har diskutert og vil gjerne legge inn et motbud på 8,7 mill.",
      direction: "inn",
      relativeTime: "2t siden",
      timestamp: "2026-03-14T18:15:00",
    },
    {
      id: "msg-2",
      channel: "SMS",
      content: "Vi er veldig interesserte — kan vi få til visning i helgen?",
      direction: "inn",
      relativeTime: "4d siden",
      timestamp: "2026-03-10T09:15:00",
    },
    {
      id: "msg-3",
      channel: "SMS",
      content: "Hei Jennifer! Visning søndag kl. 11 passer fint. Adressen er Eikeveien 14.",
      direction: "ut",
      relativeTime: "4d siden",
      timestamp: "2026-03-10T10:00:00",
    },
  ],
  notes: [
    {
      id: "note-1",
      content:
        "Flytter fra London Q2 2026. Barn 8 og 11 år — nærhet til International School viktig. Partner (James) mer prisbevisst.",
      author: "Alex Rivera",
      relativeTime: "5d siden",
      timestamp: "2026-03-09T14:00:00",
    },
    {
      id: "note-2",
      content:
        "Visning: Kunden begeistret for hagen og garasjen. Bekymret for støy fra E18 — viste støyrapport.",
      author: "Alex Rivera",
      relativeTime: "2d siden",
      timestamp: "2026-03-12T12:30:00",
    },
  ],
  documents: [
    {
      id: "doc-1",
      name: "Finansieringsbevis DNB.pdf",
      type: "Finansiering",
      size: "245 KB",
      relativeTime: "6d siden",
      timestamp: "2026-03-08T10:30:00",
    },
    {
      id: "doc-2",
      name: "Tilstandsrapport Eikeveien 14.pdf",
      type: "Tilstandsrapport",
      size: "1,2 MB",
      relativeTime: "3d siden",
      timestamp: "2026-03-11T09:00:00",
    },
    {
      id: "doc-3",
      name: "Budskjema signert.pdf",
      type: "Kontrakt",
      size: "380 KB",
      relativeTime: "2t siden",
      timestamp: "2026-03-14T18:30:00",
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Svar på motbud innen kl. 12",
      dueRelative: "I dag",
      dueDate: "15. mars 2026",
      priority: "Høy",
      completed: false,
    },
    {
      id: "task-2",
      title: "Send oppdatert budskjema til selger",
      dueRelative: "I morgen",
      dueDate: "16. mars 2026",
      priority: "Høy",
      completed: false,
    },
    {
      id: "task-3",
      title: "Book oppfølgingssamtale med begge parter",
      dueRelative: "Om 2 dager",
      dueDate: "17. mars 2026",
      priority: "Medium",
      completed: false,
    },
    {
      id: "task-4",
      title: "Visning gjennomført",
      dueRelative: "Fullført",
      dueDate: "12. mars 2026",
      priority: "Medium",
      completed: true,
    },
  ],
};

function buildDetailFromLead(lead: Lead): LeadDetail {
  const municipality = lead.property.includes(",")
    ? lead.property.split(", ").slice(1).join(", ")
    : "Norge";

  return {
    lead,
    profile: {
      name: lead.customerName,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      tags: lead.tags,
      createdAt: "Ukjent",
      preferredContact: "Telefon",
      buyerType: "Ikke spesifisert",
      financing: "Under vurdering",
    },
    property: {
      address: lead.property,
      type: lead.propertyType,
      size: "—",
      rooms: "—",
      yearBuilt: "—",
      askingPrice: "—",
      budget: lead.budget,
      municipality,
    },
    aiSummary: {
      headline: `${lead.status} — AI-score ${lead.aiPriorityScore}`,
      summary: lead.aiRecommendation,
      keyInsights: [
        `Lukkingssannsynlighet: ${lead.closingProbability}%`,
        `Sist aktiv: ${lead.lastActivity}`,
        `Kilde: ${lead.source}`,
      ],
      urgency: lead.priority,
      confidence: lead.aiPriorityScore,
    },
    timeline: [
      {
        id: `${lead.id}-tl-1`,
        type: "status",
        title: lead.status,
        description: lead.aiRecommendation,
        relativeTime: lead.lastActivity,
        timestamp: new Date().toISOString(),
        actor: "System",
      },
      {
        id: `${lead.id}-tl-2`,
        type: "call",
        title: "Siste kontakt",
        description: `Oppfølging med ${lead.customerName} via ${lead.source}.`,
        relativeTime: lead.lastActivity,
        timestamp: new Date().toISOString(),
        actor: "Alex Rivera",
      },
    ],
    calls: [
      {
        id: `${lead.id}-call-1`,
        direction: "ut",
        duration: "—",
        summary: `Oppfølgingssamtale med ${lead.customerName}.`,
        relativeTime: lead.lastActivity,
        timestamp: new Date().toISOString(),
      },
    ],
    emails: [
      {
        id: `${lead.id}-email-1`,
        subject: `Oppfølging — ${lead.property}`,
        preview: lead.aiRecommendation,
        direction: "ut",
        relativeTime: lead.lastActivity,
        timestamp: new Date().toISOString(),
      },
    ],
    messages: [],
    notes: [
      {
        id: `${lead.id}-note-1`,
        content: lead.aiRecommendation,
        author: "Alex Rivera",
        relativeTime: lead.lastActivity,
        timestamp: new Date().toISOString(),
      },
    ],
    documents: [],
    tasks: [
      {
        id: `${lead.id}-task-1`,
        title: lead.aiRecommendation,
        dueRelative: "I dag",
        dueDate: "—",
        priority: lead.priority,
        completed: false,
      },
    ],
  };
}

const DETAIL_OVERRIDES: Record<string, LeadDetail> = {
  "lead-1": JENNIFER_WALSH_DETAIL,
};

export function getLeadDetailById(id: string): LeadDetail | null {
  const lead = DEFAULT_LEADS.find((l) => l.id === id);
  if (!lead) return null;

  return DETAIL_OVERRIDES[id] ?? buildDetailFromLead(lead);
}

export const MOCK_LEAD_DETAILS: Record<string, LeadDetail> = Object.fromEntries(
  DEFAULT_LEADS.map((lead) => [lead.id, getLeadDetailById(lead.id)!]),
);

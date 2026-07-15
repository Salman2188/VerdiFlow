import type { DashboardHeroContent } from "./types";

export const DEFAULT_HERO_CONTENT: DashboardHeroContent = {
  agentName: "Alex",
  aiSummary:
    "Du har 3 varme leads og 2 visninger i dag. AI har forberedt personlige oppfølginger for Walsh og Park, og prioritert oppgavene som gir størst verdi akkurat nå.",
  focusTasks: [
    {
      id: "1",
      priority: 1,
      title: "Send tilbud til Jennifer Walsh",
      context: "Eikeveien 14 · Varm lead",
      value: "Høyest sannsynlighet for lukking",
    },
    {
      id: "2",
      priority: 2,
      title: "Bekreft visning kl. 10:00",
      context: "Maple Dr 42 · Torres",
      value: "Visning i dag",
    },
    {
      id: "3",
      priority: 3,
      title: "Følg opp Park-familien",
      context: "Motbud mottatt i natt",
      value: "AI-utkast klart",
    },
  ],
  briefInsights: [
    { id: "1", text: "AI genererte 4 oppfølginger mens du sov." },
    { id: "2", text: "Walsh åpnet e-posten din to ganger i går kveld." },
    { id: "3", text: "Torres bekreftet visning — forbered salgsargument for pris." },
    { id: "4", text: "2 leads fra Finn.no venter på første kontakt." },
  ],
};

import type { KanbanColumnId } from "./types";

export type PipelineColumnEmptySuggestion = {
  title: string;
  suggestion: string;
};

export const PIPELINE_COLUMN_EMPTY_SUGGESTIONS: Record<
  KanbanColumnId,
  PipelineColumnEmptySuggestion
> = {
  "nye-leads": {
    title: "Ingen nye leads",
    suggestion:
      "AI overvåker Finn.no og hjemmesiden. Importer eller vent på nye henvendelser — de prioriteres automatisk.",
  },
  kontaktet: {
    title: "Ingen leads i dialog",
    suggestion:
      "Flytt nye leads hit etter første kontakt. AI foreslår oppfølgingstidspunkt basert på responstid.",
  },
  "visning-booket": {
    title: "Ingen visninger booket",
    suggestion:
      "AI anbefaler å booke visning innen 48 timer for varme leads — øker lukkingssannsynlighet med 23%.",
  },
  "bud-sendt": {
    title: "Ingen bud sendt",
    suggestion:
      "Når kunden er klar, genererer AI budskjema og oppfølging. Sjekk leads i forhandlingsstadiet.",
  },
  forhandling: {
    title: "Ingen aktive forhandlinger",
    suggestion:
      "Leads med motbud eller motbud mottatt hører hjemme her. AI varsler når svarfrist nærmer seg.",
  },
  solgt: {
    title: "Ingen lukkede salg ennå",
    suggestion:
      "Fullførte deals vises her. AI lærer av vunne og tapte salg for bedre prioritering fremover.",
  },
};

export function getPipelineColumnEmptySuggestion(
  columnId: KanbanColumnId,
): PipelineColumnEmptySuggestion {
  return PIPELINE_COLUMN_EMPTY_SUGGESTIONS[columnId];
}

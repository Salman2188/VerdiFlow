import { Search, Sparkles, UserPlus } from "lucide-react";

import {
  dashboardEmptyState,
  dashboardFocusRing,
} from "@/components/dashboard/dashboard-styles";

type LeadsEmptyStateProps = {
  variant: "no-leads" | "no-results";
  searchQuery?: string;
  onClearFilters?: () => void;
};

export function LeadsEmptyState({
  variant,
  searchQuery,
  onClearFilters,
}: LeadsEmptyStateProps) {
  if (variant === "no-leads") {
    return (
      <div className={dashboardEmptyState}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06]">
          <UserPlus className="h-6 w-6 text-emerald-400/80" strokeWidth={1.5} />
        </div>

        <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-zinc-50">
          Ingen leads ennå
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Når nye henvendelser kommer inn fra Finn.no, hjemmesiden eller referanser, vises de
          her — prioritert av AI for raskere oppfølging.
        </p>

        <button
          type="button"
          className={`mt-6 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2 text-sm font-medium text-emerald-300 transition-colors duration-150 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] ${dashboardFocusRing}`}
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.75} />
          Importer leads
        </button>
      </div>
    );
  }

  return (
    <div className={`${dashboardEmptyState} py-14`}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50">
        <Search className="h-5 w-5 text-zinc-500" strokeWidth={1.5} />
      </div>

      <h3 className="mt-4 text-sm font-semibold tracking-[-0.02em] text-zinc-50">
        Ingen leads matcher søket
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        {searchQuery
          ? `Fant ingen resultater for «${searchQuery}». Prøv et annet søkeord eller juster filtrene.`
          : "Ingen leads matcher de aktive filtrene. Prøv å utvide søket."}
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className={`mt-5 text-sm font-medium text-emerald-400 transition-colors duration-150 hover:text-emerald-300 ${dashboardFocusRing}`}
        >
          Nullstill alle filtre
        </button>
      )}
    </div>
  );
}

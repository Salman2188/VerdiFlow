import { Search, Sparkles, UserPlus } from "lucide-react";

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
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] px-8 py-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.06] blur-[80px]"
        />

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.06]">
          <UserPlus className="h-7 w-7 text-emerald-400/70" strokeWidth={1.5} />
        </div>

        <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.02em] text-white">
          Ingen leads ennå
        </h3>
        <p className="relative mx-auto mt-3 max-w-md text-[14px] leading-[1.7] text-zinc-500">
          Når nye henvendelser kommer inn fra Finn.no, hjemmesiden eller referanser, vises de
          her — prioritert av AI for raskere oppfølging.
        </p>

        <button
          type="button"
          className="relative mt-8 inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-5 py-2.5 text-[13px] font-medium text-emerald-300 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12]"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.75} />
          Importer leads
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] px-8 py-14 text-center shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <Search className="h-6 w-6 text-zinc-500" strokeWidth={1.5} />
      </div>

      <h3 className="relative mt-5 text-[15px] font-semibold tracking-[-0.02em] text-white">
        Ingen leads matcher søket
      </h3>
      <p className="relative mx-auto mt-2 max-w-sm text-[13px] leading-[1.65] text-zinc-500">
        {searchQuery
          ? `Fant ingen resultater for «${searchQuery}». Prøv et annet søkeord eller juster filtrene.`
          : "Ingen leads matcher de aktive filtrene. Prøv å utvide søket."}
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="relative mt-6 text-[13px] font-medium text-emerald-400/80 transition-colors duration-300 hover:text-emerald-300"
        >
          Nullstill alle filtre
        </button>
      )}
    </div>
  );
}

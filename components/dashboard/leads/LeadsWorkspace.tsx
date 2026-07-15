"use client";

import { useEffect, useMemo, useState } from "react";

import { DEFAULT_LEADS_QUERY, filterLeads, computeLeadsStats } from "./filter-utils";
import { LeadCard } from "./LeadCard";
import { LeadTable } from "./LeadTable";
import { LeadsEmptyState } from "./LeadsEmptyState";
import { LeadsLoadingState } from "./LeadsLoadingState";
import { LeadsPageHeader } from "./LeadsPageHeader";
import { LeadsToolbar } from "./LeadsToolbar";
import { useLeads } from "./use-leads";
import type { Lead, LeadsQuery } from "./types";

type LeadsWorkspaceProps = {
  /** Optional override for testing or SSR. Defaults to async mock fetch. */
  initialLeads?: Lead[];
};

export function LeadsWorkspace({ initialLeads }: LeadsWorkspaceProps) {
  const { leads, isLoading, error } = useLeads(initialLeads);
  const [query, setQuery] = useState<LeadsQuery>(DEFAULT_LEADS_QUERY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    setReady(false);
  }, [isLoading]);

  const filteredLeads = useMemo(() => filterLeads(leads, query), [leads, query]);
  const stats = useMemo(() => computeLeadsStats(leads), [leads]);

  const handleClearFilters = () => setQuery(DEFAULT_LEADS_QUERY);

  if (isLoading) {
    return <LeadsLoadingState />;
  }

  const hasNoLeads = leads.length === 0 && !error;
  const hasNoResults = !hasNoLeads && filteredLeads.length === 0;

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <LeadsPageHeader stats={stats} />

      <section
        aria-label="Leadliste"
        className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl lg:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        />

        <LeadsToolbar
          query={query}
          resultCount={filteredLeads.length}
          onQueryChange={setQuery}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-6">
          {error && (
            <div className="mb-4 rounded-xl border border-rose-500/15 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-300/90">
              {error}
            </div>
          )}

          {hasNoLeads && <LeadsEmptyState variant="no-leads" />}

          {hasNoResults && (
            <LeadsEmptyState
              variant="no-results"
              searchQuery={query.search}
              onClearFilters={handleClearFilters}
            />
          )}

          {!hasNoLeads && !hasNoResults && (
            <>
              <div className="grid gap-4 lg:hidden">
                {filteredLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>

              <div className="hidden lg:block">
                <LeadTable leads={filteredLeads} />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

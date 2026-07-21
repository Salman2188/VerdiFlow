"use client";

import { useEffect, useMemo, useState } from "react";

import { dashboardPage, dashboardSectionPanel, dashboardSectionPanelBody } from "@/components/dashboard/dashboard-styles";

import { DEFAULT_LEADS_QUERY, filterLeads, computeLeadsStats } from "./filter-utils";
import { LeadCard } from "./LeadCard";
import { LeadTable } from "./LeadTable";
import { LeadsEmptyState } from "./LeadsEmptyState";
import { LeadsPageHeader } from "./LeadsPageHeader";
import { LeadsToolbar } from "./LeadsToolbar";
import type { Lead, LeadsQuery } from "./types";

type LeadsWorkspaceProps = {
  leads: Lead[];
};

export function LeadsWorkspace({ leads }: LeadsWorkspaceProps) {
  const [query, setQuery] = useState<LeadsQuery>(DEFAULT_LEADS_QUERY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const filteredLeads = useMemo(() => filterLeads(leads, query), [leads, query]);
  const stats = useMemo(() => computeLeadsStats(leads), [leads]);

  const handleClearFilters = () => setQuery(DEFAULT_LEADS_QUERY);

  const hasNoLeads = leads.length === 0;
  const hasNoResults = !hasNoLeads && filteredLeads.length === 0;

  return (
    <div
      className={`${dashboardPage} transition-opacity duration-300 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <LeadsPageHeader stats={stats} />

      <section aria-label="Leadliste" className={dashboardSectionPanel}>
        <div className={dashboardSectionPanelBody}>
        <LeadsToolbar
          query={query}
          resultCount={filteredLeads.length}
          onQueryChange={setQuery}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-6">
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
        </div>
      </section>
    </div>
  );
}

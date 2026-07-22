"use client";

import { Search } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import {
  pipelineSearch,
} from "./pipeline-board-styles";
import type { PipelineBoardStats } from "./types";

type PipelineBoardHeaderProps = {
  stats: PipelineBoardStats;
  query: string;
  onQueryChange: (query: string) => void;
  filteredCount: number;
  isFiltering: boolean;
};

export function PipelineBoardHeader({
  stats,
  query,
  onQueryChange,
  filteredCount,
  isFiltering,
}: PipelineBoardHeaderProps) {
  return (
    <div className="space-y-4">
      <DashboardPageHeader
        stats={[
          { label: "Leads", value: stats.total },
          { label: "I forhandling", value: stats.inNegotiation },
          { label: "Høy prioritet", value: stats.highPriority, accent: "text-emerald-400/90" },
          { label: "Solgt", value: stats.sold },
        ]}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Søk navn eller eiendom…"
            aria-label="Søk i pipeline"
            className={`${pipelineSearch} pl-9`}
          />
        </div>
        {isFiltering ? (
          <p className="text-xs text-zinc-500">
            Viser {filteredCount} av {stats.total} leads
          </p>
        ) : null}
      </div>
    </div>
  );
}

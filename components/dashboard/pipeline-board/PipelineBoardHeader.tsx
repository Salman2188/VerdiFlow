"use client";

import { Search } from "lucide-react";

import {
  pipelineHeader,
  pipelineSearch,
  pipelineStat,
  pipelineStatLabel,
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
    <header className={pipelineHeader}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-2xl">
            Pipeline
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={pipelineStatLabel}>
              <span className={pipelineStat}>{stats.total}</span> leads
            </span>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <span className={pipelineStatLabel}>
              <span className={pipelineStat}>{stats.inNegotiation}</span> i forhandling
            </span>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <span className={pipelineStatLabel}>
              <span className={pipelineStat}>{stats.highPriority}</span> høy prioritet
            </span>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <span className={pipelineStatLabel}>
              <span className={pipelineStat}>{stats.sold}</span> solgt
            </span>
          </p>
        </div>

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
      </div>

      {isFiltering ? (
        <p className="mt-3 text-xs text-zinc-500">
          Viser {filteredCount} av {stats.total} leads
        </p>
      ) : null}
    </header>
  );
}

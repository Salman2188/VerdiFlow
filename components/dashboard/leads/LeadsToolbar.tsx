import { Search, SlidersHorizontal, X } from "lucide-react";

import { SMART_FILTERS } from "./leads-data";
import type {
  LeadPriorityFilter,
  LeadSourceFilter,
  LeadStageFilter,
  LeadsQuery,
} from "./types";

type LeadsToolbarProps = {
  query: LeadsQuery;
  resultCount: number;
  onQueryChange: (query: LeadsQuery) => void;
  onClearFilters: () => void;
};

const STAGE_OPTIONS: { value: LeadStageFilter; label: string }[] = [
  { value: "all", label: "Alle stadier" },
  { value: "hot", label: "Hot" },
  { value: "warm", label: "Warm" },
  { value: "active", label: "Active" },
  { value: "new", label: "Ny" },
];

const PRIORITY_OPTIONS: { value: LeadPriorityFilter; label: string }[] = [
  { value: "all", label: "Alle prioriteter" },
  { value: "Høy", label: "Høy" },
  { value: "Medium", label: "Medium" },
  { value: "Lav", label: "Lav" },
];

const SOURCE_OPTIONS: { value: LeadSourceFilter; label: string }[] = [
  { value: "all", label: "Alle kilder" },
  { value: "Finn.no", label: "Finn.no" },
  { value: "Zett", label: "Zett" },
  { value: "Referanse", label: "Referanse" },
  { value: "Hjemmeside", label: "Hjemmeside" },
  { value: "Sosiale medier", label: "Sosiale medier" },
  { value: "Meglertjeneste", label: "Meglertjeneste" },
];

function SelectFilter<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      className="h-9 cursor-pointer appearance-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 pr-8 text-[12px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.09] hover:bg-white/[0.05] focus:border-emerald-500/25 focus:outline-none focus:ring-1 focus:ring-emerald-500/15"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-[#0a0e0c]">
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function LeadsToolbar({
  query,
  resultCount,
  onQueryChange,
  onClearFilters,
}: LeadsToolbarProps) {
  const hasActiveFilters =
    query.search !== "" ||
    query.smartFilter !== "all" ||
    query.stage !== "all" ||
    query.priority !== "all" ||
    query.source !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-600"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query.search}
            onChange={(event) => onQueryChange({ ...query, search: event.target.value })}
            placeholder="Søk etter kunde, eiendom, telefon eller e-post..."
            className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pr-4 pl-10 text-[13px] text-zinc-200 placeholder:text-zinc-600 transition-all duration-300 focus:border-emerald-500/25 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-500/15"
          />
          {query.search && (
            <button
              type="button"
              onClick={() => onQueryChange({ ...query, search: "" })}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-400"
              aria-label="Tøm søk"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-[12px] text-zinc-600">
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span className="tabular-nums">
            {resultCount} {resultCount === 1 ? "lead" : "leads"}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="ml-1 text-emerald-400/70 transition-colors hover:text-emerald-300"
            >
              Nullstill
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {SMART_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onQueryChange({ ...query, smartFilter: filter.id })}
            title={filter.description}
            className={`shrink-0 rounded-xl border px-3.5 py-2 text-[12px] font-medium transition-all duration-300 ${
              query.smartFilter === filter.id
                ? "border-emerald-500/25 bg-emerald-500/[0.1] text-emerald-300"
                : "border-white/[0.05] bg-white/[0.02] text-zinc-500 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <SelectFilter
          value={query.stage}
          options={STAGE_OPTIONS}
          onChange={(stage) => onQueryChange({ ...query, stage })}
        />
        <SelectFilter
          value={query.priority}
          options={PRIORITY_OPTIONS}
          onChange={(priority) => onQueryChange({ ...query, priority })}
        />
        <SelectFilter
          value={query.source}
          options={SOURCE_OPTIONS}
          onChange={(source) => onQueryChange({ ...query, source })}
        />
      </div>
    </div>
  );
}

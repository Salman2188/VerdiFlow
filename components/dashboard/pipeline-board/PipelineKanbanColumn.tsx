"use client";

import { PipelineKanbanCard } from "./PipelineKanbanCard";
import type { KanbanColumn, KanbanColumnId } from "./types";

const COLUMN_ACCENT: Record<KanbanColumnId, string> = {
  "nye-leads": "border-white/[0.04] hover:border-sky-500/15",
  kontaktet: "border-white/[0.04] hover:border-violet-500/15",
  "visning-booket": "border-white/[0.04] hover:border-amber-500/15",
  "bud-sendt": "border-white/[0.04] hover:border-rose-500/15",
  forhandling: "border-white/[0.04] hover:border-emerald-500/20",
  solgt: "border-white/[0.04] hover:border-emerald-500/25",
};

const DROP_HIGHLIGHT: Record<KanbanColumnId, string> = {
  "nye-leads": "border-sky-500/30 bg-sky-500/[0.04]",
  kontaktet: "border-violet-500/30 bg-violet-500/[0.04]",
  "visning-booket": "border-amber-500/30 bg-amber-500/[0.04]",
  "bud-sendt": "border-rose-500/30 bg-rose-500/[0.04]",
  forhandling: "border-emerald-500/35 bg-emerald-500/[0.06]",
  solgt: "border-emerald-500/40 bg-emerald-500/[0.08]",
};

type PipelineKanbanColumnProps = {
  column: KanbanColumn;
  draggedLeadId: string | null;
  dropTargetId: KanbanColumnId | null;
  onDragStart: (leadId: string) => void;
  onDragEnd: () => void;
  onDragOver: (columnId: KanbanColumnId) => void;
  onDragLeave: () => void;
  onDrop: (columnId: KanbanColumnId) => void;
};

export function PipelineKanbanColumn({
  column,
  draggedLeadId,
  dropTargetId,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: PipelineKanbanColumnProps) {
  const isDropTarget = dropTargetId === column.id && draggedLeadId !== null;

  return (
    <div className="flex w-[17.5rem] shrink-0 flex-col lg:w-auto lg:min-w-[17.5rem] lg:flex-1">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm" aria-hidden="true">
            {column.emoji}
          </span>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-white">
            {column.label}
          </h3>
        </div>
        <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium tabular-nums text-zinc-500">
          {column.leads.length}
        </span>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          onDragOver(column.id);
        }}
        onDragLeave={onDragLeave}
        onDrop={(event) => {
          event.preventDefault();
          onDrop(column.id);
        }}
        className={`flex min-h-[12rem] flex-col gap-3 rounded-2xl border p-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${COLUMN_ACCENT[column.id]} ${
          isDropTarget ? DROP_HIGHLIGHT[column.id] : "bg-white/[0.01]"
        }`}
      >
        {column.leads.length === 0 && (
          <div
            className={`flex flex-1 items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center transition-all duration-500 ${
              isDropTarget
                ? "border-emerald-500/30 text-emerald-400/60"
                : "border-white/[0.04] text-zinc-600"
            }`}
          >
            <p className="text-[11px]">
              {isDropTarget ? "Slipp lead her" : "Ingen leads i denne fasen"}
            </p>
          </div>
        )}

        {column.leads.map((lead) => (
          <PipelineKanbanCard
            key={lead.id}
            lead={lead}
            isDragging={draggedLeadId === lead.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

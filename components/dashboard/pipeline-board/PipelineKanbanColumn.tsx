"use client";

import {
  pipelineColumn,
  pipelineColumnBody,
  pipelineColumnBodyActive,
  pipelineColumnHeader,
} from "./pipeline-board-styles";
import { PipelineKanbanCard } from "./PipelineKanbanCard";
import type { KanbanColumn, KanbanColumnId } from "./types";

const STAGE_DOT: Record<KanbanColumnId, string> = {
  "nye-leads": "bg-zinc-500",
  kontaktet: "bg-sky-400",
  "visning-booket": "bg-amber-400",
  "bud-sendt": "bg-violet-400",
  forhandling: "bg-emerald-400",
  solgt: "bg-emerald-500",
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
    <div className={pipelineColumn}>
      <div className={pipelineColumnHeader}>
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${STAGE_DOT[column.id]}`}
            aria-hidden="true"
          />
          <h2 className="truncate text-sm font-medium text-zinc-200">{column.label}</h2>
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-zinc-500">
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
        className={`${pipelineColumnBody} ${isDropTarget ? pipelineColumnBodyActive : ""}`}
      >
        {column.leads.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-zinc-800 px-3 py-8 text-center">
            <p className="text-xs text-zinc-600">
              {isDropTarget ? "Slipp lead her" : "Ingen leads"}
            </p>
          </div>
        ) : null}

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

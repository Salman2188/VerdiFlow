"use client";

import { useCallback, useState } from "react";

import { PipelineKanbanColumn } from "./PipelineKanbanColumn";
import type { KanbanBoard, KanbanColumnId } from "./types";

type PipelineKanbanBoardProps = {
  board: KanbanBoard;
  onMoveLead: (leadId: string, toColumnId: KanbanColumnId) => void;
};

export function PipelineKanbanBoard({ board, onMoveLead }: PipelineKanbanBoardProps) {
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<KanbanColumnId | null>(null);

  const handleDragStart = useCallback((leadId: string) => {
    setDraggedLeadId(leadId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedLeadId(null);
    setDropTargetId(null);
  }, []);

  const handleDrop = useCallback(
    (columnId: KanbanColumnId) => {
      if (draggedLeadId) {
        onMoveLead(draggedLeadId, columnId);
      }
      setDraggedLeadId(null);
      setDropTargetId(null);
    },
    [draggedLeadId, onMoveLead],
  );

  return (
    <section
      aria-label="Pipeline Kanban"
      className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl lg:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="relative -mx-2 flex gap-4 overflow-x-auto px-2 pb-2 lg:gap-5">
        {board.columns.map((column) => (
          <PipelineKanbanColumn
            key={column.id}
            column={column}
            draggedLeadId={draggedLeadId}
            dropTargetId={dropTargetId}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={setDropTargetId}
            onDragLeave={() => setDropTargetId(null)}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </section>
  );
}

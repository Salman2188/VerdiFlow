"use client";

import { useCallback, useState } from "react";

import {
  pipelineBoardCanvas,
  pipelineBoardShell,
} from "./pipeline-board-styles";
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
    <section aria-label="Pipeline tavle" className={pipelineBoardShell}>
      <div className={pipelineBoardCanvas}>
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

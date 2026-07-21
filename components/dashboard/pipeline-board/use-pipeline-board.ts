"use client";

import { useCallback, useState } from "react";

import { updateLeadColumn } from "@/lib/services/pipeline-mutations";

import { moveLeadOnBoard } from "./board-utils";
import type { KanbanBoard, KanbanColumnId } from "./types";

type UsePipelineBoardResult = {
  board: KanbanBoard;
  moveLead: (leadId: string, toColumnId: KanbanColumnId) => void;
};

export function usePipelineBoard(initialBoard: KanbanBoard): UsePipelineBoardResult {
  const [board, setBoard] = useState(initialBoard);

  const moveLead = useCallback((leadId: string, toColumnId: KanbanColumnId) => {
    setBoard((current) => moveLeadOnBoard(current, leadId, toColumnId));
    void updateLeadColumn(leadId, toColumnId);
  }, []);

  return { board, moveLead };
}

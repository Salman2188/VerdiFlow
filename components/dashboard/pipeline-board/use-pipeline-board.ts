"use client";

import { useCallback, useEffect, useState } from "react";

import { getPipelineBoard, updateLeadColumn } from "@/lib/services/pipeline.service";

import { moveLeadOnBoard } from "./board-utils";
import type { KanbanBoard, KanbanColumnId } from "./types";

type UsePipelineBoardResult = {
  board: KanbanBoard;
  isLoading: boolean;
  moveLead: (leadId: string, toColumnId: KanbanColumnId) => void;
};

export function usePipelineBoard(): UsePipelineBoardResult {
  const [board, setBoard] = useState<KanbanBoard>({ columns: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const data = await getPipelineBoard();
        if (!cancelled) setBoard(data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const moveLead = useCallback((leadId: string, toColumnId: KanbanColumnId) => {
    setBoard((current) => moveLeadOnBoard(current, leadId, toColumnId));
    void updateLeadColumn(leadId, toColumnId);
  }, []);

  return { board, isLoading, moveLead };
}

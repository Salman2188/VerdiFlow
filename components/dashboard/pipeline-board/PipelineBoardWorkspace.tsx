"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  computePipelineBoardStats,
  countVisibleLeads,
  filterBoard,
} from "./board-utils";
import { PipelineBoardHeader } from "./PipelineBoardHeader";
import { PipelineKanbanBoard } from "./PipelineKanbanBoard";
import { pipelineWorkspace } from "./pipeline-board-styles";
import { usePipelineBoard } from "./use-pipeline-board";
import type { KanbanBoard, KanbanColumnId } from "./types";

const VALID_STAGE_IDS = new Set<KanbanColumnId>([
  "nye-leads",
  "kontaktet",
  "visning-booket",
  "bud-sendt",
  "forhandling",
  "solgt",
]);

type PipelineBoardWorkspaceProps = {
  initialBoard: KanbanBoard;
};

export function PipelineBoardWorkspace({ initialBoard }: PipelineBoardWorkspaceProps) {
  const searchParams = useSearchParams();
  const { board, moveLead } = usePipelineBoard(initialBoard);
  const [query, setQuery] = useState("");

  const stats = useMemo(() => computePipelineBoardStats(board), [board]);
  const filteredBoard = useMemo(() => filterBoard(board, query), [board, query]);
  const filteredCount = useMemo(() => countVisibleLeads(filteredBoard), [filteredBoard]);
  const isFiltering = query.trim().length > 0;

  const stageParam = searchParams.get("stage");

  useEffect(() => {
    if (!stageParam || !VALID_STAGE_IDS.has(stageParam as KanbanColumnId)) {
      return;
    }

    const column = document.getElementById(`pipeline-column-${stageParam}`);
    column?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [stageParam]);

  return (
    <div className={pipelineWorkspace}>
      <PipelineBoardHeader
        stats={stats}
        query={query}
        onQueryChange={setQuery}
        filteredCount={filteredCount}
        isFiltering={isFiltering}
      />
      <PipelineKanbanBoard board={filteredBoard} onMoveLead={moveLead} />
    </div>
  );
}

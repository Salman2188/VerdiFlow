"use client";

import { useMemo, useState } from "react";

import {
  computePipelineBoardStats,
  countVisibleLeads,
  filterBoard,
} from "./board-utils";
import { PipelineBoardHeader } from "./PipelineBoardHeader";
import { PipelineKanbanBoard } from "./PipelineKanbanBoard";
import { pipelineWorkspace } from "./pipeline-board-styles";
import { usePipelineBoard } from "./use-pipeline-board";
import type { KanbanBoard } from "./types";

type PipelineBoardWorkspaceProps = {
  initialBoard: KanbanBoard;
};

export function PipelineBoardWorkspace({ initialBoard }: PipelineBoardWorkspaceProps) {
  const { board, moveLead } = usePipelineBoard(initialBoard);
  const [query, setQuery] = useState("");

  const stats = useMemo(() => computePipelineBoardStats(board), [board]);
  const filteredBoard = useMemo(() => filterBoard(board, query), [board, query]);
  const filteredCount = useMemo(() => countVisibleLeads(filteredBoard), [filteredBoard]);
  const isFiltering = query.trim().length > 0;

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

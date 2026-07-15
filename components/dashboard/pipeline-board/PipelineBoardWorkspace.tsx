"use client";

import { useEffect, useMemo, useState } from "react";

import { computePipelineBoardStats } from "./board-utils";
import { PipelineBoardHeader } from "./PipelineBoardHeader";
import { PipelineKanbanBoard } from "./PipelineKanbanBoard";
import { usePipelineBoard } from "./use-pipeline-board";
import type { KanbanBoard } from "./types";

type PipelineBoardWorkspaceProps = {
  initialBoard: KanbanBoard;
};

export function PipelineBoardWorkspace({ initialBoard }: PipelineBoardWorkspaceProps) {
  const { board, moveLead } = usePipelineBoard(initialBoard);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const stats = useMemo(() => computePipelineBoardStats(board), [board]);

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <PipelineBoardHeader stats={stats} />
      <PipelineKanbanBoard board={board} onMoveLead={moveLead} />
    </div>
  );
}

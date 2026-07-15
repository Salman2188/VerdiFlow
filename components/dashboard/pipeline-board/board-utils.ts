import type { KanbanBoard, KanbanColumnId, PipelineBoardStats } from "./types";

export function moveLeadOnBoard(
  board: KanbanBoard,
  leadId: string,
  toColumnId: KanbanColumnId,
): KanbanBoard {
  let movedLead = null;

  const columnsWithoutLead = board.columns.map((column) => {
    const lead = column.leads.find((l) => l.id === leadId);
    if (!lead) return column;

    movedLead = { ...lead, columnId: toColumnId };
    return {
      ...column,
      leads: column.leads.filter((l) => l.id !== leadId),
    };
  });

  if (!movedLead) return board;

  return {
    columns: columnsWithoutLead.map((column) =>
      column.id === toColumnId
        ? { ...column, leads: [...column.leads, movedLead!] }
        : column,
    ),
  };
}

export function computePipelineBoardStats(board: KanbanBoard): PipelineBoardStats {
  const allLeads = board.columns.flatMap((c) => c.leads);

  return {
    total: allLeads.length,
    inNegotiation:
      board.columns.find((c) => c.id === "forhandling")?.leads.length ?? 0,
    highPriority: allLeads.filter((l) => l.priority === "Høy").length,
    sold: board.columns.find((c) => c.id === "solgt")?.leads.length ?? 0,
  };
}

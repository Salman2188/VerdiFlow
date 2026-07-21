"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import {
  pipelineCard,
  pipelineCardDragging,
  pipelineCardHover,
} from "./pipeline-board-styles";
import type { KanbanLead } from "./types";

type PipelineKanbanCardProps = {
  lead: KanbanLead;
  isDragging?: boolean;
  onDragStart: (leadId: string) => void;
  onDragEnd: () => void;
};

export function PipelineKanbanCard({
  lead,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: PipelineKanbanCardProps) {
  const router = useRouter();
  const dragStarted = useRef(false);

  return (
    <article
      draggable
      onDragStart={(event) => {
        dragStarted.current = true;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", lead.id);
        onDragStart(lead.id);
      }}
      onDragEnd={() => {
        onDragEnd();
        setTimeout(() => {
          dragStarted.current = false;
        }, 0);
      }}
      onClick={() => {
        if (!dragStarted.current) {
          router.push(`/dashboard/leads/${lead.id}`);
        }
      }}
      className={`${pipelineCard} ${pipelineCardHover} ${
        isDragging ? pipelineCardDragging : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/dashboard/leads/${lead.id}`}
          onClick={(event) => event.stopPropagation()}
          className="truncate text-sm font-medium text-zinc-100 hover:text-zinc-50"
        >
          {lead.customerName}
        </Link>
        <span
          className="shrink-0 text-xs font-medium tabular-nums text-zinc-500"
          title="AI-prioritet"
        >
          {lead.aiPriorityScore}
        </span>
      </div>

      <p className="mt-1 truncate text-xs text-zinc-500">{lead.property}</p>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs text-zinc-500">
        <span className="truncate">{lead.lastActivity}</span>
        <span className="shrink-0 tabular-nums text-zinc-400">{lead.closingProbability}%</span>
      </div>

      {lead.aiRecommendation ? (
        <p className="mt-2 line-clamp-2 rounded-md border border-emerald-500/10 bg-emerald-500/[0.03] px-2 py-1.5 text-xs leading-5 text-zinc-400">
          {lead.aiRecommendation}
        </p>
      ) : null}
    </article>
  );
}

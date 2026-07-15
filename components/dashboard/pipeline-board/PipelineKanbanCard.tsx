"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Clock, Home, Sparkles } from "lucide-react";

import { LeadPriorityScore } from "@/components/dashboard/leads/LeadPriorityScore";

import type { KanbanLead } from "./types";

const PRIORITY_STYLE: Record<KanbanLead["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

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

  const probabilityColor =
    lead.closingProbability >= 60
      ? "text-emerald-400"
      : lead.closingProbability >= 35
        ? "text-amber-400/90"
        : "text-zinc-400";

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
        }, 100);
      }}
      onClick={() => {
        if (!dragStarted.current) {
          router.push(`/dashboard/leads/${lead.id}`);
        }
      }}
      className={`group relative cursor-grab overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 shadow-[0_2px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/[0.08] hover:bg-white/[0.03] hover:shadow-[0_8px_32px_rgba(0,0,0,0.28),0_0_20px_rgba(16,185,129,0.05)] active:cursor-grabbing ${
        isDragging
          ? "scale-[1.03] border-emerald-500/25 bg-white/[0.04] opacity-90 shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_24px_rgba(16,185,129,0.1)]"
          : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <div className="flex items-start gap-3">
        <LeadPriorityScore score={lead.aiPriorityScore} size="sm" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/dashboard/leads/${lead.id}`}
              onClick={(event) => event.stopPropagation()}
              className="truncate text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors hover:text-emerald-300"
            >
              {lead.customerName}
            </Link>
            <span
              className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide ${PRIORITY_STYLE[lead.priority]}`}
            >
              {lead.priority}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] text-zinc-500">
            <Home className="h-3 w-3 shrink-0" strokeWidth={1.75} />
            {lead.property}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[10px] text-zinc-600">
          <Clock className="h-3 w-3" strokeWidth={1.75} />
          {lead.lastActivity}
        </span>
        <span className={`text-[11px] font-semibold tabular-nums ${probabilityColor}`}>
          {lead.closingProbability}% lukking
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-emerald-500/[0.08] bg-emerald-500/[0.04] px-3 py-2.5">
        <p className="flex items-start gap-1.5 text-[11px] leading-[1.6] text-emerald-200/70">
          <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/60" strokeWidth={1.75} />
          {lead.aiRecommendation}
        </p>
      </div>
    </article>
  );
}

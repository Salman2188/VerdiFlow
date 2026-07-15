import { CheckCircle2, Circle } from "lucide-react";

import { DetailSection } from "./DetailSection";
import type { LeadTask } from "./types";

const PRIORITY_STYLE: Record<LeadTask["priority"], string> = {
  Høy: "text-emerald-400/80",
  Medium: "text-zinc-400",
  Lav: "text-zinc-500",
};

type LeadDetailTasksProps = {
  tasks: LeadTask[];
};

export function LeadDetailTasks({ tasks }: LeadDetailTasksProps) {
  const upcoming = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  return (
    <DetailSection
      title="Kommende oppgaver"
      subtitle="Prioritert av AI"
      badge={`${upcoming.length} åpne`}
      icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      {upcoming.length === 0 ? (
        <p className="text-[12px] text-zinc-600">Ingen åpne oppgaver.</p>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((task) => (
            <li
              key={task.id}
              className="flex gap-3 rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
            >
              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" strokeWidth={1.75} />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white">{task.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
                  <span className="text-zinc-600">{task.dueRelative}</span>
                  <span className={`font-medium ${PRIORITY_STYLE[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {completed.length > 0 && (
        <div className="mt-5 border-t border-white/[0.04] pt-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
            Fullført
          </p>
          <ul className="space-y-2">
            {completed.map((task) => (
              <li key={task.id} className="flex items-center gap-2 text-[12px] text-zinc-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/50" strokeWidth={1.75} />
                <span className="line-through">{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DetailSection>
  );
}

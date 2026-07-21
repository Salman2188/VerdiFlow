import {
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  StickyNote,
} from "lucide-react";

import { DetailSection } from "./DetailSection";
import type { ActivityType, TimelineEvent } from "./types";

const EVENT_ICON: Record<ActivityType, typeof Phone> = {
  call: Phone,
  email: Mail,
  message: MessageSquare,
  note: StickyNote,
  document: FileText,
  task: Clock,
  status: Sparkles,
};

const EVENT_COLOR: Record<ActivityType, string> = {
  call: "border-sky-500/15 bg-sky-500/[0.06] text-sky-400/80",
  email: "border-violet-500/15 bg-violet-500/[0.06] text-violet-400/80",
  message: "border-amber-500/15 bg-amber-500/[0.06] text-amber-400/80",
  note: "border-zinc-700/80 bg-zinc-900/60 text-zinc-400/80",
  document: "border-rose-500/15 bg-rose-500/[0.06] text-rose-400/80",
  task: "border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-400/80",
  status: "border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-400/80",
};

type LeadDetailTimelineProps = {
  events: TimelineEvent[];
};

export function LeadDetailTimeline({ events }: LeadDetailTimelineProps) {
  return (
    <DetailSection
      title="Tidslinje"
      subtitle="Alle interaksjoner kronologisk"
      badge={`${events.length} hendelser`}
      icon={<Clock className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <ol className="relative space-y-0">
        {events.map((event, index) => {
          const Icon = EVENT_ICON[event.type];
          const isLast = index === events.length - 1;

          return (
            <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-9 left-4 h-[calc(100%-12px)] w-px bg-zinc-800"
                />
              )}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${EVENT_COLOR[event.type]}`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold tracking-[-0.01em] text-zinc-50">
                    {event.title}
                  </p>
                  <span className="text-[10px] text-zinc-600">{event.relativeTime}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{event.description}</p>
                <p className="mt-1.5 text-[10px] text-zinc-600">{event.actor}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </DetailSection>
  );
}

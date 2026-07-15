import { FileText, Mail, MessageSquare, Sparkles } from "lucide-react";

import { AiSection } from "./AiSection";
import type { GeneratedMessage, GeneratedMessageType } from "./types";

const TYPE_CONFIG: Record<
  GeneratedMessageType,
  { label: string; icon: typeof Mail; color: string }
> = {
  email: {
    label: "E-post",
    icon: Mail,
    color: "border-violet-500/15 bg-violet-500/[0.06] text-violet-400/80",
  },
  sms: {
    label: "SMS",
    icon: MessageSquare,
    color: "border-sky-500/15 bg-sky-500/[0.06] text-sky-400/80",
  },
  followup: {
    label: "Oppfølging",
    icon: FileText,
    color: "border-amber-500/15 bg-amber-500/[0.06] text-amber-400/80",
  },
};

type AiGeneratedMessagesProps = {
  messages: GeneratedMessage[];
};

export function AiGeneratedMessages({ messages }: AiGeneratedMessagesProps) {
  return (
    <AiSection
      title="AI-genererte meldinger"
      subtitle="Forhåndsvisning av utkast"
      badge={`${messages.length} utkast`}
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {messages.map((message) => {
          const config = TYPE_CONFIG[message.type];
          const Icon = config.icon;

          return (
            <article
              key={message.id}
              className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${config.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">{message.recipient}</p>
                    <p className="text-[10px] text-zinc-600">
                      {config.label} · {message.relativeTime}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                    message.status === "ready"
                      ? "border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-400/80"
                      : "border-white/[0.05] bg-white/[0.03] text-zinc-500"
                  }`}
                >
                  {message.status === "ready" ? "Klar" : "Utkast"}
                </span>
              </div>

              {message.subject && (
                <p className="mt-3 text-[11px] font-medium text-zinc-400">{message.subject}</p>
              )}

              <p className="mt-2 text-[12px] leading-[1.7] text-zinc-500">{message.preview}</p>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-200"
                >
                  Rediger
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-2 text-[11px] font-medium text-emerald-300 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12]"
                >
                  Send
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </AiSection>
  );
}

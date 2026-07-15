"use client";

import { useCallback, useRef } from "react";
import { ArrowUp, MessageSquare, Sparkles } from "lucide-react";

import { AiSection } from "./AiSection";
import type { ChatMessage } from "./types";

type AiChatPanelProps = {
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export function AiChatPanel({
  messages,
  input,
  isTyping,
  onInputChange,
  onSend,
}: AiChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(() => {
    onSend();
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [onSend]);

  return (
    <AiSection
      title="AI Chat"
      subtitle="Spør om leads, pipeline, oppfølging eller planlegging"
      badge="Live"
      noPadding
      icon={<MessageSquare className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
      className="flex min-h-[28rem] flex-col"
    >
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5 lg:px-6"
        style={{ maxHeight: "24rem" }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "border border-emerald-500/20 bg-emerald-500/[0.1] text-emerald-50"
                  : "border border-white/[0.05] bg-white/[0.03] text-zinc-300"
              }`}
            >
              {message.role === "assistant" && (
                <div className="mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-emerald-400/70" strokeWidth={1.75} />
                  <span className="text-[10px] font-medium text-emerald-400/60">VerdiFlow AI</span>
                </div>
              )}
              <p className="text-[13px] leading-[1.7] tracking-[-0.01em]">{message.content}</p>
              <p className="mt-1.5 text-[10px] text-zinc-600">{message.timestamp}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.03] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/60" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/60 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/60 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.04] p-4 lg:p-5">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Spør AI om hva som helst..."
            className="h-11 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 text-[13px] text-zinc-200 placeholder:text-zinc-600 transition-all duration-300 focus:border-emerald-500/25 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-500/15"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.1] text-emerald-300 transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-500/[0.15] disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </AiSection>
  );
}

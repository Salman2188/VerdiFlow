"use client";

import { useCallback, useEffect, useState } from "react";

import { AiAlerts } from "./AiAlerts";
import { AiAssistantHeader } from "./AiAssistantHeader";
import { AiAssistantLoadingState } from "./AiAssistantLoadingState";
import { AiChatPanel } from "./AiChatPanel";
import { AiDailySummary } from "./AiDailySummary";
import { AiGeneratedMessages } from "./AiGeneratedMessages";
import { AiQuickActions } from "./AiQuickActions";
import { AiRecommendations } from "./AiRecommendations";
import { useAiAssistant } from "./use-ai-assistant";
import type { ChatMessage, QuickActionId } from "./types";
import { QUICK_ACTION_RESPONSES } from "./types";

const MOCK_CHAT_RESPONSES = [
  "Basert på dagens data anbefaler jeg å starte med dine 3 høyest prioriterte leads. Vil du at jeg genererer oppfølgingsutkast?",
  "Jeg har analysert pipeline-en din. 4 leads er i forhandlingsfasen med samlet verdi på ca. 32M kr. Skal jeg lage en salgsprognose?",
  "Godt spørsmål. Jeg kan hjelpe deg med å planlegge dagen, skrive oppfølginger eller oppsummere uken. Hva trenger du mest nå?",
];

function getTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export function AiAssistantWorkspace() {
  const { data, isLoading } = useAiAssistant();
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);

  useEffect(() => {
    if (!isLoading && data && data.chatMessages.length > 0) {
      setMessages(data.chatMessages);
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    setReady(false);
  }, [isLoading, data]);

  const addAssistantMessage = useCallback((content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, role: "assistant", content, timestamp: getTimestamp() },
      ]);
      setIsTyping(false);
    }, 800);
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, role: "user", content: trimmed, timestamp: getTimestamp() },
    ]);
    setInput("");

    const response = MOCK_CHAT_RESPONSES[responseIndex % MOCK_CHAT_RESPONSES.length];
    setResponseIndex((i) => i + 1);
    addAssistantMessage(response);
  }, [input, isTyping, responseIndex, addAssistantMessage]);

  const handleQuickAction = useCallback(
    (actionId: QuickActionId) => {
      if (!data) return;
      const action = data.quickActions.find((a) => a.id === actionId);
      if (!action || isTyping) return;

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: "user",
          content: action.label,
          timestamp: getTimestamp(),
        },
      ]);
      addAssistantMessage(QUICK_ACTION_RESPONSES[actionId]);
    },
    [data, isTyping, addAssistantMessage],
  );

  if (isLoading || !data) {
    return <AiAssistantLoadingState />;
  }

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <AiAssistantHeader />
      <AiDailySummary summary={data.dailySummary} />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <AiChatPanel
            messages={messages}
            input={input}
            isTyping={isTyping}
            onInputChange={setInput}
            onSend={handleSend}
          />
        </div>
        <div className="lg:col-span-5">
          <AiAlerts alerts={data.alerts} />
        </div>
      </div>

      <AiQuickActions
        actions={data.quickActions}
        onAction={handleQuickAction}
        disabled={isTyping}
      />

      <AiRecommendations recommendations={data.recommendations} />
      <AiGeneratedMessages messages={data.generatedMessages} />
    </div>
  );
}

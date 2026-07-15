"use client";

import { useState } from "react";
import {
  FileText,
  Mail,
  MessageSquare,
  Phone,
  StickyNote,
} from "lucide-react";

import { DetailSection } from "./DetailSection";
import type {
  ActivityTab,
  ActivityTabId,
  LeadCall,
  LeadDocument,
  LeadEmail,
  LeadMessage,
  LeadNote,
} from "./types";

type LeadDetailActivityPanelProps = {
  calls: LeadCall[];
  emails: LeadEmail[];
  messages: LeadMessage[];
  notes: LeadNote[];
  documents: LeadDocument[];
};

const TAB_ICONS: Record<ActivityTabId, typeof Phone> = {
  calls: Phone,
  emails: Mail,
  messages: MessageSquare,
  notes: StickyNote,
  documents: FileText,
};

function CallsList({ calls }: { calls: LeadCall[] }) {
  if (calls.length === 0) {
    return <p className="text-[12px] text-zinc-600">Ingen samtaler registrert.</p>;
  }
  return (
    <ul className="space-y-3">
      {calls.map((call) => (
        <li
          key={call.id}
          className="rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-white">
              {call.direction === "inn" ? "Innkommende" : "Utgående"} — {call.duration}
            </span>
            <span className="text-[10px] text-zinc-600">{call.relativeTime}</span>
          </div>
          <p className="mt-2 text-[12px] leading-[1.6] text-zinc-500">{call.summary}</p>
        </li>
      ))}
    </ul>
  );
}

function EmailsList({ emails }: { emails: LeadEmail[] }) {
  if (emails.length === 0) {
    return <p className="text-[12px] text-zinc-600">Ingen e-poster registrert.</p>;
  }
  return (
    <ul className="space-y-3">
      {emails.map((email) => (
        <li
          key={email.id}
          className="rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-white">{email.subject}</span>
            <span className="text-[10px] text-zinc-600">{email.relativeTime}</span>
          </div>
          <p className="mt-1 text-[10px] text-zinc-600">
            {email.direction === "inn" ? "Mottatt" : "Sendt"}
          </p>
          <p className="mt-2 text-[12px] leading-[1.6] text-zinc-500">{email.preview}</p>
        </li>
      ))}
    </ul>
  );
}

function MessagesList({ messages }: { messages: LeadMessage[] }) {
  if (messages.length === 0) {
    return <p className="text-[12px] text-zinc-600">Ingen meldinger registrert.</p>;
  }
  return (
    <ul className="space-y-3">
      {messages.map((msg) => (
        <li
          key={msg.id}
          className="rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-white">{msg.channel}</span>
            <span className="text-[10px] text-zinc-600">{msg.relativeTime}</span>
          </div>
          <p className="mt-1 text-[10px] text-zinc-600">
            {msg.direction === "inn" ? "Mottatt" : "Sendt"}
          </p>
          <p className="mt-2 text-[12px] leading-[1.6] text-zinc-500">{msg.content}</p>
        </li>
      ))}
    </ul>
  );
}

function NotesList({ notes }: { notes: LeadNote[] }) {
  if (notes.length === 0) {
    return <p className="text-[12px] text-zinc-600">Ingen notater registrert.</p>;
  }
  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li
          key={note.id}
          className="rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-white">{note.author}</span>
            <span className="text-[10px] text-zinc-600">{note.relativeTime}</span>
          </div>
          <p className="mt-2 text-[12px] leading-[1.65] text-zinc-500">{note.content}</p>
        </li>
      ))}
    </ul>
  );
}

function DocumentsList({ documents }: { documents: LeadDocument[] }) {
  if (documents.length === 0) {
    return <p className="text-[12px] text-zinc-600">Ingen dokumenter lastet opp.</p>;
  }
  return (
    <ul className="space-y-3">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] bg-black/15 p-4 transition-colors hover:border-white/[0.06]"
        >
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium text-white">{doc.name}</p>
            <p className="mt-0.5 text-[10px] text-zinc-600">
              {doc.type} · {doc.size}
            </p>
          </div>
          <span className="shrink-0 text-[10px] text-zinc-600">{doc.relativeTime}</span>
        </li>
      ))}
    </ul>
  );
}

export function LeadDetailActivityPanel({
  calls,
  emails,
  messages,
  notes,
  documents,
}: LeadDetailActivityPanelProps) {
  const tabs: ActivityTab[] = [
    { id: "calls", label: "Samtaler", count: calls.length },
    { id: "emails", label: "E-poster", count: emails.length },
    { id: "messages", label: "Meldinger", count: messages.length },
    { id: "notes", label: "Notater", count: notes.length },
    { id: "documents", label: "Dokumenter", count: documents.length },
  ];

  const [activeTab, setActiveTab] = useState<ActivityTabId>("calls");

  return (
    <DetailSection title="Aktivitet" subtitle="Samtaler, e-poster, meldinger og mer">
      <div className="flex gap-1 overflow-x-auto border-b border-white/[0.04] pb-4">
        {tabs.map((tab) => {
          const Icon = TAB_ICONS[tab.id];
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-medium transition-all duration-300 ${
                isActive
                  ? "border-emerald-500/25 bg-emerald-500/[0.1] text-emerald-300"
                  : "border-transparent text-zinc-500 hover:border-white/[0.05] hover:bg-white/[0.03] hover:text-zinc-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {tab.label}
              <span className="tabular-nums text-[10px] opacity-70">{tab.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {activeTab === "calls" && <CallsList calls={calls} />}
        {activeTab === "emails" && <EmailsList emails={emails} />}
        {activeTab === "messages" && <MessagesList messages={messages} />}
        {activeTab === "notes" && <NotesList notes={notes} />}
        {activeTab === "documents" && <DocumentsList documents={documents} />}
      </div>
    </DetailSection>
  );
}

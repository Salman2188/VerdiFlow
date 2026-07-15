"use client";

import { Bell, Calendar } from "lucide-react";

import { TopNavIconButton } from "./TopNavIconButton";

export function TopNavNotifications() {
  return (
    <TopNavIconButton
      icon={Bell}
      label="Notifications"
      badge={
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
      }
    />
  );
}

export function TopNavCalendar() {
  return <TopNavIconButton icon={Calendar} label="Calendar" />;
}

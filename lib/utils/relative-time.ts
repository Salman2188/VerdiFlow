export function formatRelativeTime(date: Date | string): string {
  const then = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - then.getTime();

  if (diffMs < 0) {
    return "nå";
  }

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) {
    return `${Math.max(minutes, 1)}m siden`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}t siden`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d siden`;
}

export function daysSince(date: Date | string): number {
  const then = typeof date === "string" ? new Date(date) : date;
  return Math.floor((Date.now() - then.getTime()) / 86_400_000);
}

export function formatNorwegianDate(date: Date | string): string {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDueRelative(dueDate: string | null, completed: boolean): string {
  if (completed) {
    return "Fullført";
  }

  if (!dueDate) {
    return "—";
  }

  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diff = Math.round((due.getTime() - today.getTime()) / 86_400_000);

  if (diff < 0) {
    return "Forfalt";
  }

  if (diff === 0) {
    return "I dag";
  }

  if (diff === 1) {
    return "I morgen";
  }

  return `Om ${diff} dager`;
}

import { AlertTriangle, Bell, Info } from "lucide-react";

import { AiSection } from "./AiSection";
import type { AiAlert, AiAlertSeverity } from "./types";

const SEVERITY_CONFIG: Record<
  AiAlertSeverity,
  { icon: typeof AlertTriangle; accent: string; border: string }
> = {
  high: {
    icon: AlertTriangle,
    accent: "text-rose-400/90",
    border: "border-rose-500/15 bg-rose-500/[0.04]",
  },
  medium: {
    icon: Bell,
    accent: "text-amber-400/90",
    border: "border-amber-500/15 bg-amber-500/[0.04]",
  },
  low: {
    icon: Info,
    accent: "text-zinc-400",
    border: "border-zinc-800 bg-zinc-900/30",
  },
};

type AiAlertsProps = {
  alerts: AiAlert[];
};

export function AiAlerts({ alerts }: AiAlertsProps) {
  return (
    <AiSection
      title="AI Varsler"
      subtitle="Krever din oppmerksomhet"
      badge={`${alerts.length} aktive`}
      icon={<Bell className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <ul className="space-y-3">
        {alerts.map((alert) => {
          const config = SEVERITY_CONFIG[alert.severity];
          const Icon = config.icon;

          return (
            <li
              key={alert.id}
              className={`rounded-lg border p-4 transition-colors duration-150 hover:border-zinc-700 ${config.border}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.accent}`} strokeWidth={1.75} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold tracking-[-0.01em] text-white">
                      {alert.title}
                    </p>
                    <span className="shrink-0 text-[10px] text-zinc-600">{alert.relativeTime}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-[1.65] text-zinc-500">
                    {alert.description}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-[11px] font-medium text-emerald-400/80 transition-colors hover:text-emerald-300"
                  >
                    {alert.actionLabel} →
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AiSection>
  );
}

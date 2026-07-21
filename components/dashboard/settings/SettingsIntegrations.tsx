import {
  Calendar,
  Database,
  Link2,
  MessageCircle,
  Share2,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  dashboardFocusRing,
  dashboardInteractiveCard,
} from "@/components/dashboard/dashboard-styles";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import type { Integration, IntegrationId } from "./types";

const INTEGRATION_ICONS: Record<IntegrationId, LucideIcon> = {
  instagram: Share2,
  manychat: MessageCircle,
  make: Workflow,
  supabase: Database,
  "google-calendar": Calendar,
  outlook: Calendar,
};

const STATUS_STYLE: Record<Integration["status"], string> = {
  aktiv: "border-emerald-500/15 bg-emerald-500/[0.08] text-emerald-400/80",
  feil: "border-rose-500/15 bg-rose-500/[0.08] text-rose-400/80",
  "ikke tilkoblet": "border-zinc-800 bg-zinc-950/50 text-zinc-500",
};

type SettingsIntegrationsProps = {
  integrations: Integration[];
};

export function SettingsIntegrations({ integrations }: SettingsIntegrationsProps) {
  return (
    <AiSection
      title="Integrasjoner"
      subtitle="Koble VerdiFlow til dine verktøy"
      badge={`${integrations.filter((i) => i.connected).length} aktive`}
      icon={<Link2 className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = INTEGRATION_ICONS[integration.id];

          return (
            <article key={integration.id} className={`${dashboardInteractiveCard} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                  <Icon className="h-5 w-5 text-emerald-400/80" strokeWidth={1.75} />
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${STATUS_STYLE[integration.status]}`}
                >
                  {integration.connected ? "Tilkoblet" : "Ikke tilkoblet"}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold tracking-[-0.01em] text-zinc-50">
                {integration.name}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">{integration.description}</p>

              <div className="mt-4 space-y-1.5 text-[10px] text-zinc-600">
                <p>
                  Status:{" "}
                  <span className="text-zinc-400 capitalize">{integration.status}</span>
                </p>
                <p>
                  Siste synk:{" "}
                  <span className="text-zinc-400">{integration.lastSync}</span>
                </p>
              </div>

              <button
                type="button"
                className={`mt-4 w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs font-medium text-zinc-400 transition-colors duration-150 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-200 ${dashboardFocusRing}`}
              >
                {integration.connected ? "Administrer" : "Koble til"}
              </button>
            </article>
          );
        })}
      </div>
    </AiSection>
  );
}

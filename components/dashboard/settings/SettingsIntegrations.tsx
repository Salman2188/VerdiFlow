import {
  Calendar,
  Database,
  Link2,
  MessageCircle,
  Share2,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  "ikke tilkoblet": "border-white/[0.05] bg-white/[0.03] text-zinc-500",
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
            <article
              key={integration.id}
              className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.07] hover:bg-white/[0.03] hover:shadow-[0_6px_24px_rgba(0,0,0,0.22),0_0_20px_rgba(16,185,129,0.03)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.06]">
                  <Icon className="h-5 w-5 text-emerald-400/80" strokeWidth={1.75} />
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${STATUS_STYLE[integration.status]}`}
                >
                  {integration.connected ? "Tilkoblet" : "Ikke tilkoblet"}
                </span>
              </div>

              <h3 className="mt-4 text-[14px] font-semibold tracking-[-0.01em] text-white">
                {integration.name}
              </h3>
              <p className="mt-1.5 text-[11px] leading-[1.6] text-zinc-500">
                {integration.description}
              </p>

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
                className="mt-4 w-full rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-zinc-400 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-zinc-200"
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

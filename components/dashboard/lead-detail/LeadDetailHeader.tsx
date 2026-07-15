import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LeadQuickActions } from "@/components/dashboard/leads/LeadQuickActions";
import { LeadStatusBadge } from "@/components/dashboard/leads/LeadStatusBadge";

import type { LeadDetail } from "./types";

type LeadDetailHeaderProps = {
  detail: LeadDetail;
};

export function LeadDetailHeader({ detail }: LeadDetailHeaderProps) {
  const { lead } = detail;

  return (
    <header className="space-y-4">
      <Link
        href="/dashboard/leads"
        className="inline-flex items-center gap-2 text-[12px] font-medium text-zinc-500 transition-colors duration-300 hover:text-emerald-400/80"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
        Tilbake til leads
      </Link>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-emerald-500/[0.08] blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
              Kundekommandosenter
            </p>
            <h1 className="mt-2 text-[1.75rem] font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
              {lead.customerName}
            </h1>
            <p className="mt-2 text-[13px] text-zinc-500">{lead.property}</p>
            <div className="mt-3">
              <LeadStatusBadge status={lead.status} stage={lead.stage} />
            </div>
          </div>

          <LeadQuickActions customerName={lead.customerName} variant="card" />
        </div>
      </div>
    </header>
  );
}

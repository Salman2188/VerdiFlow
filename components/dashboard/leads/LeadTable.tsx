import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";

import { dashboardSectionPanel } from "@/components/dashboard/dashboard-styles";

import { LeadContactInfo } from "./LeadContactInfo";
import { LeadPriorityScore } from "./LeadPriorityScore";
import { LeadQuickActions } from "./LeadQuickActions";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { Lead } from "./types";

const PRIORITY_STYLE: Record<Lead["priority"], string> = {
  Høy: "bg-emerald-500/10 text-emerald-400/85 border-emerald-500/15",
  Medium: "bg-white/[0.04] text-zinc-400 border-white/[0.06]",
  Lav: "bg-white/[0.03] text-zinc-500 border-white/[0.05]",
};

type LeadTableProps = {
  leads: Lead[];
};

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <div className={`overflow-hidden ${dashboardSectionPanel}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80">
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                AI Score
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Kunde
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Eiendom
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Kontakt
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Status
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Siste aktivitet
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                AI anbefaling
              </th>
              <th className="px-5 py-4 text-left text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={lead.id}
                className={`group border-b border-zinc-800/60 transition-colors duration-150 hover:bg-zinc-900/40 ${
                  index === leads.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <LeadPriorityScore score={lead.aiPriorityScore} size="sm" />
                </td>
                <td className="px-5 py-4">
                  <div className="min-w-[140px]">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors hover:text-emerald-300"
                    >
                      {lead.customerName}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-zinc-600">{lead.source}</p>
                    <span
                      className={`mt-1.5 inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${PRIORITY_STYLE[lead.priority]}`}
                    >
                      {lead.priority}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="min-w-[160px]">
                    <p className="text-[12px] font-medium text-zinc-300">{lead.property}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-600">
                      {lead.propertyType} · {lead.budget}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="min-w-[150px]">
                    <LeadContactInfo email={lead.email} phone={lead.phone} />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <LeadStatusBadge status={lead.status} stage={lead.stage} size="sm" />
                  <p className="mt-1.5 text-[10px] tabular-nums text-emerald-400/70">
                    {lead.closingProbability}% lukking
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Clock className="h-3 w-3" strokeWidth={1.75} />
                    {lead.lastActivity}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="flex max-w-[220px] items-start gap-1.5 text-[11px] leading-[1.6] text-emerald-200/65">
                    <Sparkles
                      className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400/50"
                      strokeWidth={1.75}
                    />
                    {lead.aiRecommendation}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <LeadQuickActions customerName={lead.customerName} variant="table" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

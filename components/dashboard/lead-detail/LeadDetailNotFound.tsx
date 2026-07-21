import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";

import {
  dashboardEmptyState,
  dashboardFocusRing,
} from "@/components/dashboard/dashboard-styles";

export function LeadDetailNotFound() {
  return (
    <div className={dashboardEmptyState}>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50">
        <UserX className="h-5 w-5 text-zinc-500" strokeWidth={1.5} />
      </div>

      <h2 className="mt-4 text-base font-semibold tracking-[-0.02em] text-zinc-50">
        Lead ikke funnet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
        Denne leaden finnes ikke eller er arkivert. Gå tilbake til leadslisten.
      </p>

      <Link
        href="/dashboard/leads"
        className={`mt-6 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-4 py-2 text-sm font-medium text-emerald-300 transition-colors duration-150 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] ${dashboardFocusRing}`}
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Tilbake til leads
      </Link>
    </div>
  );
}

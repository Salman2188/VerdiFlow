import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";

export function LeadDetailNotFound() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] px-8 py-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <UserX className="h-6 w-6 text-zinc-500" strokeWidth={1.5} />
      </div>

      <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-white">
        Lead ikke funnet
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-[1.65] text-zinc-500">
        Denne leaden finnes ikke eller er arkivert. Gå tilbake til leadslisten.
      </p>

      <Link
        href="/dashboard/leads"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-5 py-2.5 text-[13px] font-medium text-emerald-300 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Tilbake til leads
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b0a] px-4 py-12 text-zinc-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/landing"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
              V
            </span>
            VerdiFlow
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-white">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e0c]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          {children}
        </div>

        {footer ? <div className="mt-6 text-center text-sm text-zinc-500">{footer}</div> : null}
      </div>
    </div>
  );
}

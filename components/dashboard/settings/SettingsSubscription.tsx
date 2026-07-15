import { Check, CreditCard, Sparkles } from "lucide-react";

import type { SubscriptionPlan } from "./types";

type SettingsSubscriptionProps = {
  subscription: SubscriptionPlan;
};

export function SettingsSubscription({ subscription }: SettingsSubscriptionProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent p-6 shadow-[0_8px_40px_rgba(0,0,0,0.28),0_0_40px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08]">
              <CreditCard className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/60">
                Abonnement
              </p>
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">
                {subscription.name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold tabular-nums tracking-[-0.03em] text-white">
            {subscription.price}
          </p>
          <p className="mt-1 text-[12px] text-zinc-500">
            Neste betaling: {subscription.nextPayment}
          </p>

          <ul className="mt-6 space-y-2.5">
            {subscription.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <Check className="h-3.5 w-3.5 text-emerald-400/70" strokeWidth={1.75} />
                <span className="text-[13px] text-zinc-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600 px-8 text-[14px] font-semibold tracking-[-0.015em] text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_0_1px_rgba(52,211,153,0.3),0_4px_20px_rgba(16,185,129,0.25)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,185,129,0.35)]"
        >
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          Oppgrader plan
        </button>
      </div>
    </section>
  );
}

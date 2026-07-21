import { Check, CreditCard, Sparkles } from "lucide-react";

import {
  dashboardFeaturedPanel,
  dashboardFocusRing,
  dashboardSectionLabel,
} from "@/components/dashboard/dashboard-styles";

import type { SubscriptionPlan } from "./types";

type SettingsSubscriptionProps = {
  subscription: SubscriptionPlan;
};

export function SettingsSubscription({ subscription }: SettingsSubscriptionProps) {
  return (
    <section className={dashboardFeaturedPanel}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.08]">
              <CreditCard className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className={dashboardSectionLabel}>Abonnement</p>
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-zinc-50">
                {subscription.name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-2xl font-semibold tabular-nums tracking-[-0.03em] text-zinc-50">
            {subscription.price}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Neste betaling: {subscription.nextPayment}
          </p>

          <ul className="mt-6 space-y-2.5">
            {subscription.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <Check className="h-3.5 w-3.5 text-emerald-400/70" strokeWidth={1.75} />
                <span className="text-sm text-zinc-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-emerald-400 ${dashboardFocusRing}`}
        >
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          Oppgrader plan
        </button>
      </div>
    </section>
  );
}

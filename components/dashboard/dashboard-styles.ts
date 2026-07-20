/**
 * Shared dashboard surface + typography tokens.
 */

export const dashboardPage = "mx-auto w-full max-w-[1280px] space-y-8 lg:space-y-10";

export const dashboardSectionLabel =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500";

export const dashboardSectionTitle =
  "text-base font-semibold tracking-[-0.02em] text-zinc-50 sm:text-lg";

export const dashboardSectionDescription = "mt-1 max-w-xl text-sm leading-6 text-zinc-400";

export const dashboardSubheading = "text-sm font-semibold text-zinc-100";

export const dashboardSubdescription = "mt-0.5 text-xs leading-5 text-zinc-500";

export const dashboardPanel = "rounded-xl border border-zinc-800 bg-zinc-900/30";

export const dashboardPanelPadding = "p-5 sm:p-6";

/** Static surfaces — no hover affordance (non-interactive content) */
export const dashboardCardStatic = "rounded-lg border border-zinc-800/90 bg-zinc-900/30";

export const dashboardCardPadding = "p-4";

export const dashboardMetricLabel = "text-xs font-medium text-zinc-400";

export const dashboardMetricValue =
  "text-2xl font-semibold leading-none tracking-[-0.03em] text-zinc-50 tabular-nums sm:text-3xl";

export const dashboardMetricValueFeatured =
  "text-3xl font-semibold leading-none tracking-[-0.035em] text-zinc-50 tabular-nums sm:text-4xl";

export const dashboardFocusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500/80";

export const dashboardScrollRow =
  "flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:thin] [scrollbar-color:rgb(63_63_70)_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent";

export const dashboardScrollFade =
  "pointer-events-none absolute inset-y-5 right-0 w-8 bg-gradient-to-l from-zinc-900/80 to-transparent sm:w-10";

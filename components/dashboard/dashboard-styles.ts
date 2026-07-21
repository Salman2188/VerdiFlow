/**
 * Shared dashboard surface + typography tokens.
 * Linear-inspired flat zinc system — clarity over decoration.
 */

export const dashboardPage = "mx-auto w-full space-y-8 lg:space-y-10";

export const dashboardPageHeader =
  "rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 lg:p-7";

export const dashboardPageTitle =
  "text-xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-2xl";

export const dashboardStatTile =
  "rounded-lg border border-zinc-800/90 bg-zinc-950/50 px-4 py-3.5 transition-colors duration-150 hover:border-zinc-700/80 hover:bg-zinc-900/40";

export const dashboardStatTileLabel =
  "text-[10px] font-medium uppercase tracking-wide text-zinc-500";

export const dashboardStatTileValue =
  "mt-1.5 text-xl font-semibold tabular-nums tracking-[-0.03em] text-zinc-100";

export const dashboardInteractiveCard =
  "rounded-lg border border-zinc-800/90 bg-zinc-900/30 transition-[border-color,background-color,box-shadow] duration-150 hover:border-zinc-700/90 hover:bg-zinc-900/50";

export const dashboardSectionLabel =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500";

export const dashboardSectionTitle =
  "text-base font-semibold tracking-[-0.02em] text-zinc-50 sm:text-lg";

export const dashboardSectionDescription = "mt-1 max-w-xl text-sm leading-6 text-zinc-400";

export const dashboardSubheading = "text-sm font-semibold text-zinc-100";

export const dashboardSubdescription = "mt-0.5 text-xs leading-5 text-zinc-500";

export const dashboardPanel = "rounded-xl border border-zinc-800 bg-zinc-900/30";

export const dashboardSectionPanel =
  "rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden";

export const dashboardSectionPanelHeader =
  "border-b border-zinc-800/80 px-5 py-4 lg:px-6";

export const dashboardSectionPanelBody = "p-5 lg:p-6";

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

/** Form controls — shared across Leads, Settings, Pipeline search */
export const dashboardInput =
  "h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3.5 text-sm text-zinc-200 placeholder:text-zinc-500 transition-colors duration-150 focus:border-zinc-600 focus:bg-zinc-900/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/20";

export const dashboardSelect =
  "h-9 cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 pr-8 text-xs font-medium text-zinc-400 transition-colors duration-150 hover:border-zinc-700 hover:bg-zinc-900/40 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/20";

export const dashboardFilterChipActive =
  "border-emerald-500/25 bg-emerald-500/10 text-emerald-300";

export const dashboardFilterChipInactive =
  "border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/50 hover:text-zinc-300";

export const dashboardEmptyState =
  "rounded-xl border border-zinc-800 bg-zinc-900/30 px-8 py-16 text-center";

export const dashboardAiHighlight =
  "rounded-lg border border-emerald-500/15 bg-emerald-500/[0.04]";

export const dashboardProgressTrack = "h-2 overflow-hidden rounded-full bg-zinc-800";

export const dashboardBadge =
  "rounded-md border border-zinc-800 bg-zinc-950/50 px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500";

export const dashboardToggleRow =
  "flex items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3.5";

export const dashboardFeaturedPanel =
  "rounded-xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] via-zinc-900/40 to-zinc-900/20 p-6 lg:p-8";

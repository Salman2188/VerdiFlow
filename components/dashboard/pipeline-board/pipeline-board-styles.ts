import { dashboardFocusRing } from "@/components/dashboard/dashboard-styles";

/** Full-height pipeline workspace inside dashboard shell */
export const pipelineWorkspace = "flex min-h-[calc(100dvh-3.5rem-4rem)] flex-col gap-5 lg:min-h-[calc(100dvh-3.5rem-5rem)]";

export const pipelineHeader = "shrink-0";

export const pipelineBoardShell =
  "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20";

export const pipelineBoardCanvas =
  "flex min-h-0 flex-1 gap-3 overflow-x-auto p-3 sm:p-4 [-ms-overflow-style:none] [scrollbar-width:thin] [scrollbar-color:rgb(63_63_70)_transparent] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent";

export const pipelineColumn =
  "flex h-full min-h-[20rem] w-[17.5rem] shrink-0 flex-col sm:w-[18.5rem]";

export const pipelineColumnHeader =
  "mb-2 flex shrink-0 items-center justify-between px-1 py-1";

export const pipelineColumnBody =
  "flex min-h-[12rem] flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2 [-ms-overflow-style:none] [scrollbar-width:thin] [scrollbar-color:rgb(63_63_70)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-track]:bg-transparent";

export const pipelineColumnBodyActive =
  "border-zinc-600 bg-zinc-900/60 ring-1 ring-inset ring-zinc-700/50";

export const pipelineCard =
  "cursor-grab rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 transition-[border-color,background-color,opacity,box-shadow] duration-150 active:cursor-grabbing";

export const pipelineCardHover = "hover:border-zinc-700 hover:bg-zinc-900/80";

export const pipelineCardDragging =
  "border-zinc-600 bg-zinc-900 opacity-60 shadow-lg";

export const pipelineSearch = `h-9 w-full max-w-xs rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-zinc-700 focus:bg-zinc-900 ${dashboardFocusRing}`;

export const pipelineStat = "text-sm tabular-nums text-zinc-300";

export const pipelineStatLabel = "text-sm text-zinc-500";

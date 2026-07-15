import type { LeadStageId } from "./types";

const STAGE_STYLE: Record<
  LeadStageId,
  { label: string; className: string }
> = {
  hot: {
    label: "Hot",
    className: "bg-rose-500/15 text-rose-300/90 border-rose-500/15",
  },
  warm: {
    label: "Warm",
    className: "bg-amber-500/12 text-amber-300/85 border-amber-500/12",
  },
  active: {
    label: "Active",
    className: "bg-emerald-500/12 text-emerald-300/85 border-emerald-500/12",
  },
  new: {
    label: "Ny",
    className: "bg-sky-500/12 text-sky-300/85 border-sky-500/12",
  },
};

type LeadStatusBadgeProps = {
  status: string;
  stage?: LeadStageId;
  size?: "sm" | "md";
};

export function LeadStatusBadge({ status, stage, size = "md" }: LeadStatusBadgeProps) {
  const stageStyle = stage ? STAGE_STYLE[stage] : null;
  const sizeClass = size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={`rounded-md border font-medium ${sizeClass} bg-white/[0.04] text-zinc-300/90 border-white/[0.06]`}
      >
        {status}
      </span>
      {stageStyle && (
        <span
          className={`rounded-md border font-semibold tracking-wide ${sizeClass} ${stageStyle.className}`}
        >
          {stageStyle.label}
        </span>
      )}
    </div>
  );
}

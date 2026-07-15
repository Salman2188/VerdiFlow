type LeadPriorityScoreProps = {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
};

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      ring: "border-emerald-500/25 bg-emerald-500/[0.08]",
      text: "text-emerald-400",
      glow: "shadow-[0_0_16px_rgba(16,185,129,0.15)]",
      bar: "bg-emerald-400",
    };
  }
  if (score >= 60) {
    return {
      ring: "border-amber-500/20 bg-amber-500/[0.06]",
      text: "text-amber-400/90",
      glow: "",
      bar: "bg-amber-400/90",
    };
  }
  return {
    ring: "border-white/[0.06] bg-white/[0.03]",
    text: "text-zinc-400",
    glow: "",
    bar: "bg-zinc-500",
  };
}

const SIZE_CONFIG = {
  sm: { container: "h-8 w-8", text: "text-[11px]", bar: "h-0.5 w-8" },
  md: { container: "h-10 w-10", text: "text-[13px]", bar: "h-0.5 w-10" },
  lg: { container: "h-12 w-12", text: "text-[15px]", bar: "h-0.5 w-12" },
};

export function LeadPriorityScore({
  score,
  size = "md",
  showLabel = false,
}: LeadPriorityScoreProps) {
  const style = getScoreStyle(score);
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex ${sizeConfig.container} items-center justify-center rounded-xl border font-bold tabular-nums ${style.ring} ${style.text} ${style.glow}`}
        title={`AI Priority Score: ${score}`}
      >
        <span className={sizeConfig.text}>{score}</span>
      </div>
      <div className={`${sizeConfig.bar} overflow-hidden rounded-full bg-white/[0.06]`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[9px] font-medium tracking-wide text-zinc-600 uppercase">
          AI Score
        </span>
      )}
    </div>
  );
}

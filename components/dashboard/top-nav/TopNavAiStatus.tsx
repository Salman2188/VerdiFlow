export function TopNavAiStatus() {
  return (
    <div className="hidden items-center gap-2 rounded-xl border border-emerald-500/[0.08] bg-emerald-500/[0.04] px-3 py-1.5 shadow-[0_0_20px_rgba(16,185,129,0.04)] sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.45)]" />
      <span className="text-[12px] font-medium tracking-[-0.01em] text-emerald-400/80">
        AI Online
      </span>
    </div>
  );
}

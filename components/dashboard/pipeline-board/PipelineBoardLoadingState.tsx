function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function PipelineBoardLoadingState() {
  return (
    <div className="space-y-6 lg:space-y-8" role="status" aria-label="Laster pipeline">
      <SkeletonBar className="h-36 w-full rounded-2xl" />

      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-2xl lg:p-6">
        <div className="-mx-2 flex gap-4 overflow-hidden px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[17.5rem] shrink-0">
              <SkeletonBar className="mb-4 h-5 w-32" />
              <div className="space-y-3 rounded-2xl border border-white/[0.04] p-3">
                <SkeletonBar className="h-32 w-full rounded-xl" />
                <SkeletonBar className="h-32 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Laster pipeline...</span>
    </div>
  );
}

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function AnalyticsLoadingState() {
  return (
    <div className="space-y-6 lg:space-y-8" role="status" aria-label="Laster analytics">
      <SkeletonBar className="h-36 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBar key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonBar className="h-72 rounded-2xl" />
        <SkeletonBar className="h-72 rounded-2xl" />
      </div>
      <SkeletonBar className="h-40 w-full rounded-2xl" />
      <SkeletonBar className="h-64 w-full rounded-2xl" />
      <SkeletonBar className="h-48 w-full rounded-2xl" />
      <span className="sr-only">Laster analytics...</span>
    </div>
  );
}

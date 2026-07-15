function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function LeadDetailLoadingState() {
  return (
    <div className="space-y-6 lg:space-y-8" role="status" aria-label="Laster leaddetaljer">
      <SkeletonBar className="h-4 w-28" />
      <SkeletonBar className="h-28 w-full rounded-2xl" />
      <SkeletonBar className="h-48 w-full rounded-2xl" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SkeletonBar className="h-64 w-full rounded-2xl" />
          <SkeletonBar className="h-72 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <SkeletonBar className="h-40 w-full rounded-2xl" />
          <SkeletonBar className="h-48 w-full rounded-2xl" />
          <SkeletonBar className="h-40 w-full rounded-2xl" />
          <SkeletonBar className="h-36 w-full rounded-2xl" />
        </div>
      </div>

      <span className="sr-only">Laster leaddetaljer...</span>
    </div>
  );
}

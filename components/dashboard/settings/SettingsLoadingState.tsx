function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function SettingsLoadingState() {
  return (
    <div className="space-y-6 lg:space-y-8" role="status" aria-label="Laster innstillinger">
      <SkeletonBar className="h-36 w-full rounded-2xl" />
      <SkeletonBar className="h-64 w-full rounded-2xl" />
      <SkeletonBar className="h-56 w-full rounded-2xl" />
      <SkeletonBar className="h-72 w-full rounded-2xl" />
      <SkeletonBar className="h-48 w-full rounded-2xl" />
      <span className="sr-only">Laster innstillinger...</span>
    </div>
  );
}

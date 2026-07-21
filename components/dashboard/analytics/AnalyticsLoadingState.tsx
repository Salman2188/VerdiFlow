import { dashboardPage } from "@/components/dashboard/dashboard-styles";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className ?? ""}`} aria-hidden="true" />
  );
}

export function AnalyticsLoadingState() {
  return (
    <div className={dashboardPage} role="status" aria-label="Laster analyse">
      <SkeletonBar className="h-36 w-full rounded-xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBar key={i} className="h-40 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonBar className="h-72 rounded-xl" />
        <SkeletonBar className="h-72 rounded-xl" />
      </div>
      <SkeletonBar className="h-40 w-full rounded-xl" />
      <SkeletonBar className="h-64 w-full rounded-xl" />
      <SkeletonBar className="h-48 w-full rounded-xl" />
      <span className="sr-only">Laster analyse...</span>
    </div>
  );
}

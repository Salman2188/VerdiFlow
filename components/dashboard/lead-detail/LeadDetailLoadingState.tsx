import { dashboardPage } from "@/components/dashboard/dashboard-styles";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className ?? ""}`} aria-hidden="true" />
  );
}

export function LeadDetailLoadingState() {
  return (
    <div className={dashboardPage} role="status" aria-label="Laster lead intelligence">
      <SkeletonBar className="h-4 w-28" />
      <SkeletonBar className="h-36 w-full rounded-xl" />
      <SkeletonBar className="h-48 w-full rounded-xl" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SkeletonBar className="h-64 w-full rounded-xl" />
          <SkeletonBar className="h-72 w-full rounded-xl" />
        </div>
        <div className="space-y-6">
          <SkeletonBar className="h-40 w-full rounded-xl" />
          <SkeletonBar className="h-48 w-full rounded-xl" />
          <SkeletonBar className="h-40 w-full rounded-xl" />
          <SkeletonBar className="h-36 w-full rounded-xl" />
        </div>
      </div>

      <span className="sr-only">Laster lead intelligence...</span>
    </div>
  );
}

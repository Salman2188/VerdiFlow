import { dashboardPage, dashboardPanel, dashboardPanelPadding } from "@/components/dashboard/dashboard-styles";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className}`} aria-hidden="true" />;
}

export function DashboardLoadingState() {
  return (
    <div className={`${dashboardPage} animate-pulse`} aria-busy="true" aria-label="Laster oversikt">
      <div className="space-y-3">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-96 max-w-full" />
      </div>
      <div className={`${dashboardPanel} ${dashboardPanelPadding}`}>
        <div className="grid gap-6 lg:grid-cols-5">
          <SkeletonBlock className="h-48 lg:col-span-3" />
          <SkeletonBlock className="h-48 lg:col-span-2" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-24" />
        ))}
      </div>
      <SkeletonBlock className="h-40" />
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-36" />
        ))}
      </div>
    </div>
  );
}

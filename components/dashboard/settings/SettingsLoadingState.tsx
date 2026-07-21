import { dashboardPage } from "@/components/dashboard/dashboard-styles";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className ?? ""}`} aria-hidden="true" />
  );
}

export function SettingsLoadingState() {
  return (
    <div className={dashboardPage} role="status" aria-label="Laster innstillinger">
      <SkeletonBar className="h-36 w-full rounded-xl" />
      <SkeletonBar className="h-64 w-full rounded-xl" />
      <SkeletonBar className="h-56 w-full rounded-xl" />
      <SkeletonBar className="h-72 w-full rounded-xl" />
      <SkeletonBar className="h-48 w-full rounded-xl" />
      <span className="sr-only">Laster innstillinger...</span>
    </div>
  );
}

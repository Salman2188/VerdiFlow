import {
  dashboardInteractiveCard,
  dashboardPage,
  dashboardSectionPanel,
} from "@/components/dashboard/dashboard-styles";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-zinc-800/60 ${className ?? ""}`} aria-hidden="true" />
  );
}

function LeadCardSkeleton() {
  return (
    <article className={`${dashboardInteractiveCard} p-5`}>
      <div className="flex items-start gap-4">
        <SkeletonBar className="h-10 w-10 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-3">
          <SkeletonBar className="h-4 w-36" />
          <SkeletonBar className="h-3 w-48" />
          <SkeletonBar className="h-5 w-28" />
          <div className="flex gap-3">
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="h-3 w-24" />
          </div>
        </div>
      </div>
      <SkeletonBar className="mt-4 h-14 w-full rounded-lg" />
      <div className="mt-4 flex gap-2">
        <SkeletonBar className="h-9 flex-1 rounded-lg" />
        <SkeletonBar className="h-9 flex-1 rounded-lg" />
      </div>
    </article>
  );
}

function LeadTableSkeleton() {
  return (
    <div className={`${dashboardSectionPanel} overflow-hidden`}>
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="flex gap-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBar key={i} className="h-3 w-16" />
          ))}
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, row) => (
        <div
          key={row}
          className="flex items-center gap-6 border-b border-zinc-800/60 px-5 py-4 last:border-b-0"
        >
          <SkeletonBar className="h-8 w-8 shrink-0 rounded-lg" />
          <SkeletonBar className="h-3.5 w-28" />
          <SkeletonBar className="h-3.5 w-36" />
          <SkeletonBar className="h-5 w-24" />
          <SkeletonBar className="h-3 w-16" />
          <SkeletonBar className="h-10 w-44" />
        </div>
      ))}
    </div>
  );
}

export function LeadsLoadingState() {
  return (
    <div className={dashboardPage} role="status" aria-label="Laster leads">
      <SkeletonBar className="h-28 w-full rounded-xl" />

      <section className={`${dashboardSectionPanel} p-5 lg:p-6`}>
        <div className="space-y-4">
          <SkeletonBar className="h-10 w-full rounded-lg" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBar key={i} className="h-9 w-32 shrink-0 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <LeadCardSkeleton key={i} />
          ))}
        </div>

        <div className="mt-6 hidden lg:block">
          <LeadTableSkeleton />
        </div>
      </section>

      <span className="sr-only">Laster leads...</span>
    </div>
  );
}

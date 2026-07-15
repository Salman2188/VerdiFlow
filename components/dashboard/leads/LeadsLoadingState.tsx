function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

function LeadCardSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
      <div className="flex items-start gap-4">
        <SkeletonBar className="h-10 w-10 shrink-0 rounded-xl" />
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
      <SkeletonBar className="mt-4 h-14 w-full rounded-xl" />
      <div className="mt-4 flex gap-2">
        <SkeletonBar className="h-9 flex-1 rounded-lg" />
        <SkeletonBar className="h-9 flex-1 rounded-lg" />
        <SkeletonBar className="h-9 flex-1 rounded-lg" />
      </div>
    </article>
  );
}

function LeadTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-2xl">
      <div className="border-b border-white/[0.05] px-5 py-4">
        <div className="flex gap-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBar key={i} className="h-3 w-16" />
          ))}
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, row) => (
        <div
          key={row}
          className="flex items-center gap-6 border-b border-white/[0.03] px-5 py-4 last:border-b-0"
        >
          <SkeletonBar className="h-8 w-8 shrink-0 rounded-xl" />
          <div className="min-w-[140px] space-y-2">
            <SkeletonBar className="h-3.5 w-28" />
            <SkeletonBar className="h-3 w-20" />
          </div>
          <div className="min-w-[160px] space-y-2">
            <SkeletonBar className="h-3.5 w-36" />
            <SkeletonBar className="h-3 w-24" />
          </div>
          <SkeletonBar className="h-5 w-24" />
          <SkeletonBar className="h-3 w-16" />
          <SkeletonBar className="h-10 w-44" />
          <div className="flex gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBar key={i} className="h-8 w-8 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeaderStatsSkeleton() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 backdrop-blur-2xl lg:p-8">
      <div className="space-y-4">
        <SkeletonBar className="h-3 w-24" />
        <SkeletonBar className="h-8 w-32" />
        <SkeletonBar className="h-4 w-96 max-w-full" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBar key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </header>
  );
}

export function LeadsLoadingState() {
  return (
    <div
      className="space-y-6 lg:space-y-8"
      role="status"
      aria-label="Laster leads"
    >
      <HeaderStatsSkeleton />

      <section className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-2xl lg:p-6">
        <div className="space-y-4">
          <SkeletonBar className="h-10 w-full rounded-xl" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonBar key={i} className="h-9 w-32 shrink-0 rounded-xl" />
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBar key={i} className="h-9 w-28 rounded-xl" />
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

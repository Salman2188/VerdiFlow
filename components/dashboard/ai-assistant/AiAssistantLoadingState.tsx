function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function AiAssistantLoadingState() {
  return (
    <div className="space-y-6 lg:space-y-8" role="status" aria-label="Laster AI Assistent">
      <SkeletonBar className="h-28 w-full rounded-2xl" />
      <SkeletonBar className="h-32 w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-12">
        <SkeletonBar className="h-96 rounded-2xl lg:col-span-7" />
        <SkeletonBar className="h-96 rounded-2xl lg:col-span-5" />
      </div>
      <SkeletonBar className="h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2">
        <SkeletonBar className="h-48 rounded-2xl" />
        <SkeletonBar className="h-48 rounded-2xl" />
      </div>
      <span className="sr-only">Laster AI Assistent...</span>
    </div>
  );
}

import {
  pipelineBoardCanvas,
  pipelineBoardShell,
  pipelineColumn,
  pipelineWorkspace,
} from "./pipeline-board-styles";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-800/80 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function PipelineBoardLoadingState() {
  return (
    <div className={pipelineWorkspace} role="status" aria-label="Laster pipeline">
      <div className="space-y-3">
        <SkeletonBar className="h-8 w-32" />
        <SkeletonBar className="h-4 w-64" />
      </div>

      <div className={pipelineBoardShell}>
        <div className={pipelineBoardCanvas}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={pipelineColumn}>
              <SkeletonBar className="mb-2 h-5 w-28" />
              <div className="flex flex-1 flex-col gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2">
                <SkeletonBar className="h-24 w-full" />
                <SkeletonBar className="h-24 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Laster pipeline…</span>
    </div>
  );
}

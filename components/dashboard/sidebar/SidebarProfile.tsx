import type { SidebarUser } from "./types";

type SidebarProfileProps = {
  user: SidebarUser;
};

export function SidebarProfile({ user }: SidebarProfileProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.025] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400/50 via-teal-500/40 to-emerald-700/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
            )}
            {user.isOnline && (
              <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0e0c] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold tracking-[-0.01em] text-white">
              {user.name}
            </p>
            <p className="truncate text-[11px] text-zinc-500">{user.agency}</p>
            {user.isOnline && (
              <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/80">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Online
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 h-16 w-24 rounded-full bg-emerald-500/[0.08] blur-2xl"
        />

        <div className="relative flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[-0.01em] text-zinc-400">
            AI Status
          </p>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400/75">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.45)]" />
            Online
          </span>
        </div>

        <div className="relative mt-3 space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] text-zinc-600">Last sync</span>
            <span className="text-[10px] font-medium text-zinc-400">Just now</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] text-zinc-600">Follow-ups today</span>
            <span className="text-[10px] font-medium tabular-nums text-zinc-300">18</span>
          </div>
          <p className="pt-0.5 text-[10px] font-medium tracking-[-0.01em] text-emerald-400/55">
            All automations running
          </p>
        </div>
      </div>
    </div>
  );
}

import type { SidebarUser } from "./types";

type SidebarProfileProps = {
  user: SidebarUser;
};

export function SidebarProfile({ user }: SidebarProfileProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
      <div className="flex items-center gap-3">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-zinc-700"
          />
        ) : (
          <div
            className="h-8 w-8 shrink-0 rounded-full bg-zinc-800 ring-1 ring-zinc-700"
            aria-hidden="true"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100">{user.name}</p>
          <p className="truncate text-xs text-zinc-500">{user.agency}</p>
        </div>
      </div>
    </div>
  );
}

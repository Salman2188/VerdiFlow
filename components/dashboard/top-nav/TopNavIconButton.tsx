import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type TopNavIconButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  badge?: ReactNode;
};

export function TopNavIconButton({
  icon: Icon,
  label,
  onClick,
  badge,
}: TopNavIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.08] hover:bg-white/[0.05] active:scale-[0.97]"
    >
      <Icon
        className="h-[17px] w-[17px] text-zinc-500 transition-all duration-300 group-hover:text-zinc-300 group-hover:scale-105"
        strokeWidth={1.75}
      />
      {badge}
    </button>
  );
}

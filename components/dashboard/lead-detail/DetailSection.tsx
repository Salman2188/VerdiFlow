import type { ReactNode } from "react";

type DetailSectionProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  children: ReactNode;
  className?: string;
};

export function DetailSection({
  title,
  subtitle,
  icon,
  badge,
  children,
  className,
}: DetailSectionProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
      />

      <div className="border-b border-white/[0.04] px-5 py-4 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/10 bg-emerald-500/[0.06]">
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-[13px] font-semibold tracking-[-0.02em] text-white">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-0.5 text-[11px] text-zinc-600">{subtitle}</p>
              )}
            </div>
          </div>
          {badge && (
            <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 lg:p-6">{children}</div>
    </section>
  );
}

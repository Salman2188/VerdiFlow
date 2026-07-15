import Link from "next/link";

export function SidebarLogo() {
  return (
    <Link
      href="/dashboard"
      className="group flex items-center gap-2 px-2 transition-opacity duration-300 hover:opacity-90"
    >
      <span className="text-[17px] font-semibold tracking-[-0.03em] text-white">
        Verdi
        <span className="bg-gradient-to-r from-emerald-200 to-emerald-400 bg-clip-text text-transparent">
          Flow
        </span>
      </span>
    </Link>
  );
}

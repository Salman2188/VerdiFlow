import Link from "next/link";

export function SidebarLogo() {
  return (
    <Link
      href="/dashboard"
      className="block px-2 text-[17px] font-semibold tracking-[-0.03em] text-zinc-50 transition-opacity hover:opacity-80"
    >
      Verdi<span className="text-emerald-400">Flow</span>
    </Link>
  );
}

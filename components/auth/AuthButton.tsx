"use client";

import type { ButtonHTMLAttributes } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary";
};

export function AuthButton({
  loading = false,
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}: AuthButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
      : "border border-white/[0.08] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.06]";

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

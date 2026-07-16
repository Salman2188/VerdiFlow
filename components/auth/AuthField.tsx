"use client";

import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function AuthField({ label, error, id, className = "", ...props }: AuthFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        id={fieldId}
        className={`w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-400/40 focus:bg-white/[0.05] ${className}`}
        {...props}
      />
      {error ? <p className="text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}

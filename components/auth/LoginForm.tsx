"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { useEmailResendCooldown } from "@/components/auth/useEmailResendCooldown";
import {
  magicLinkAction,
  signInAction,
  type AuthActionState,
} from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

type LoginFormProps = {
  next?: string;
  error?: string;
};

export function LoginForm({ next, error }: LoginFormProps) {
  const [mode, setMode] = useState<"password" | "magic-link">("password");
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInAction,
    INITIAL_STATE,
  );
  const [magicState, magicAction, magicPending] = useActionState(
    magicLinkAction,
    INITIAL_STATE,
  );
  const { cooldown, isCoolingDown, startCooldown } = useEmailResendCooldown();

  const state = mode === "password" ? passwordState : magicState;
  const formAction = mode === "password" ? passwordAction : magicAction;
  const pending = mode === "password" ? passwordPending : magicPending;

  useEffect(() => {
    if (mode === "magic-link" && (state.error || state.success)) {
      startCooldown();
    }
  }, [mode, state.error, state.success, startCooldown]);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your VerdiFlow account to manage leads, pipeline, and AI automations."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-emerald-300 hover:text-emerald-200">
            Create one
          </Link>
        </>
      }
    >
      <div className="mb-5 flex rounded-xl border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "password"
              ? "bg-emerald-500/20 text-emerald-200"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMode("magic-link")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            mode === "magic-link"
              ? "bg-emerald-500/20 text-emerald-200"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Magic link
        </button>
      </div>

      <form action={formAction} className="space-y-5">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {error ? <AuthAlert message={error} /> : null}
        {state.error ? <AuthAlert message={state.error} /> : null}
        {state.success ? <AuthAlert tone="success" message={state.success} /> : null}

        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />

        {mode === "password" ? (
          <>
            <AuthField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
              >
                Forgot password?
              </Link>
            </div>

            <AuthButton loading={pending}>Sign in</AuthButton>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-400">
              We&apos;ll email you a secure one-time link. No password needed.
            </p>
            <AuthButton loading={pending} disabled={isCoolingDown}>
              {isCoolingDown ? `Send again in ${cooldown}s` : "Email magic link"}
            </AuthButton>
          </>
        )}
      </form>
    </AuthShell>
  );
}

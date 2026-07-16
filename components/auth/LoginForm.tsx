"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { signInAction, type AuthActionState } from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

type LoginFormProps = {
  next?: string;
  error?: string;
};

export function LoginForm({ next, error }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, INITIAL_STATE);

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
      </form>
    </AuthShell>
  );
}

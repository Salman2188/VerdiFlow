"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthAlert, AuthButton, AuthShell } from "@/components/auth";
import {
  resendVerificationAction,
  signOutAction,
  type AuthActionState,
} from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

type VerifyEmailPanelProps = {
  email?: string;
};

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="font-medium text-emerald-300 hover:text-emerald-200"
      >
        Sign out
      </button>
    </form>
  );
}

export function VerifyEmailPanel({ email }: VerifyEmailPanelProps) {
  const [state, resendAction, resendPending] = useActionState(
    resendVerificationAction,
    INITIAL_STATE,
  );

  return (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a verification link to your inbox. Confirm your email to continue setting up VerdiFlow."
      footer={
        <>
          Wrong account? <SignOutButton />
        </>
      }
    >
      <div className="space-y-5">
        {email ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
            Verification email sent to <span className="font-medium text-white">{email}</span>
          </div>
        ) : null}

        {state.error ? <AuthAlert message={state.error} /> : null}
        {state.success ? <AuthAlert tone="success" message={state.success} /> : null}

        <p className="text-sm leading-6 text-zinc-400">
          After verifying your email, sign in to continue to Instagram onboarding.
        </p>

        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400"
        >
          Continue to sign in
        </Link>

        {email ? (
          <form action={resendAction} className="space-y-3">
            <input type="hidden" name="email" value={email} />
            <AuthButton loading={resendPending} variant="secondary">
              Resend verification email
            </AuthButton>
          </form>
        ) : (
          <Link
            href="/login"
            className="block text-center text-sm font-medium text-emerald-300 hover:text-emerald-200"
          >
            Back to sign in
          </Link>
        )}
      </div>
    </AuthShell>
  );
}

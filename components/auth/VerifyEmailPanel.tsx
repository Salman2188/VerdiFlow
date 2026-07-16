"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import { AuthAlert, AuthButton, AuthShell } from "@/components/auth";
import { useEmailResendCooldown } from "@/components/auth/useEmailResendCooldown";
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
  const { cooldown, isCoolingDown, startCooldown } = useEmailResendCooldown();

  useEffect(() => {
    if (state.error || state.success) {
      startCooldown();
    }
  }, [state.error, state.success, startCooldown]);

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

        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-100">
          If no email arrives within a few minutes, check spam. Supabase&apos;s built-in
          email allows only 2 auth emails per hour for the whole project — resend can
          look successful even when delivery is blocked. Wait up to an hour before trying
          again.
        </div>

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
            <AuthButton
              loading={resendPending}
              disabled={isCoolingDown}
              variant="secondary"
            >
              {isCoolingDown
                ? `Resend available in ${cooldown}s`
                : "Resend verification email"}
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

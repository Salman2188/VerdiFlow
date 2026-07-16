"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { useEmailResendCooldown } from "@/components/auth/useEmailResendCooldown";
import { forgotPasswordAction, type AuthActionState } from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, INITIAL_STATE);
  const { cooldown, isCoolingDown, startCooldown } = useEmailResendCooldown();

  useEffect(() => {
    if (state.error || state.success) {
      startCooldown();
    }
  }, [state.error, state.success, startCooldown]);

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email on your account and we will send you a secure reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
            Back to sign in
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-5">
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

        <AuthButton loading={pending} disabled={isCoolingDown}>
          {isCoolingDown ? `Send again in ${cooldown}s` : "Send reset link"}
        </AuthButton>
      </form>
    </AuthShell>
  );
}

"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { forgotPasswordAction, type AuthActionState } from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, INITIAL_STATE);

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

        <AuthButton loading={pending}>Send reset link</AuthButton>
      </form>
    </AuthShell>
  );
}

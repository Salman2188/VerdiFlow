"use client";

import { useActionState } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { resetPasswordAction, type AuthActionState } from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPasswordAction, INITIAL_STATE);

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Your reset link is valid for a limited time. Choose a strong password to secure your account."
    >
      <form action={formAction} className="space-y-5">
        {state.error ? <AuthAlert message={state.error} /> : null}

        <AuthField
          label="New password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />
        <AuthField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          minLength={8}
          required
        />

        <AuthButton loading={pending}>Update password</AuthButton>
      </form>
    </AuthShell>
  );
}

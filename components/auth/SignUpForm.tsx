"use client";

import Link from "next/link";
import { useActionState } from "react";

import { AuthAlert, AuthButton, AuthField, AuthShell } from "@/components/auth";
import { signUpAction, type AuthActionState } from "@/lib/auth/actions";

const INITIAL_STATE: AuthActionState = {};

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, INITIAL_STATE);

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start with VerdiFlow in minutes. We will email you a verification link before your first login."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
            Sign in
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-5">
        {state.error ? <AuthAlert message={state.error} /> : null}

        <AuthField
          label="Full name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Alex Rivera"
          required
        />
        <AuthField
          label="Work email"
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <AuthButton loading={pending}>Create account</AuthButton>
      </form>
    </AuthShell>
  );
}

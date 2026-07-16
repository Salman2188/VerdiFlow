import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthHashHandler } from "@/components/auth/AuthHashHandler";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password | VerdiFlow",
};

export default function ResetPasswordPage() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthHashHandler />
      </Suspense>
      <ResetPasswordForm />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthCallbackHandler } from "@/components/auth/AuthCallbackHandler";

export const metadata: Metadata = {
  title: "Signing in | VerdiFlow",
};

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#070b0a] text-sm text-zinc-400">Signing you in...</div>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}

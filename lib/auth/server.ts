import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import {
  AUTH_ROUTES,
  ONBOARDING_ROUTES,
  isProtectedPath,
} from "@/lib/auth/routes";
import { isEmailVerified } from "@/lib/auth/session";
import {
  ensureOnboardingRow,
  getOnboardingState,
  syncEmailVerificationStep,
} from "@/lib/auth/onboarding";
import { requireAuthUser, resolveAuthUser } from "@/lib/auth/user";

export async function getCurrentUser(): Promise<User> {
  return requireAuthUser();
}

export async function getOptionalUser(): Promise<User | null> {
  return resolveAuthUser();
}

export async function requireVerifiedUser(): Promise<User> {
  const user = await requireAuthUser();

  if (!isEmailVerified(user)) {
    redirect(AUTH_ROUTES.verifyEmail);
  }

  if (user.email_confirmed_at) {
    await syncEmailVerificationStep(user.id, user.email_confirmed_at);
  }

  return user;
}

export async function requireVerifiedUserForPath(pathname: string): Promise<User> {
  const user = await requireVerifiedUser();

  if (!isProtectedPath(pathname)) {
    return user;
  }

  const onboarding =
    (await getOnboardingState(user.id)) ?? (await ensureOnboardingRow(user.id));

  const currentStep = onboarding?.current_step;

  if (currentStep === "connect_instagram" && pathname.startsWith("/dashboard")) {
    redirect(ONBOARDING_ROUTES.connectInstagram);
  }

  return user;
}

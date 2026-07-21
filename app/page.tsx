import { redirect } from "next/navigation";

import { AUTH_ROUTES, ONBOARDING_ROUTES, APP_ROUTES } from "@/lib/auth/routes";
import { getPostAuthRedirect, isEmailVerified } from "@/lib/auth/session";
import {
  ensureOnboardingRow,
  getOnboardingState,
  syncEmailVerificationStep,
} from "@/lib/auth/onboarding";
import { getOptionalUser } from "@/lib/auth/server";

export default async function HomePage() {
  const user = await getOptionalUser();

  if (!user) {
    redirect(APP_ROUTES.dashboard);
  }

  if (!isEmailVerified(user)) {
    redirect(AUTH_ROUTES.verifyEmail);
  }

  if (user.email_confirmed_at) {
    await syncEmailVerificationStep(user.id, user.email_confirmed_at);
  }

  const onboarding =
    (await getOnboardingState(user.id)) ?? (await ensureOnboardingRow(user.id));

  redirect(
    getPostAuthRedirect({
      user,
      onboardingStep: onboarding?.current_step ?? "connect_instagram",
    }),
  );
}

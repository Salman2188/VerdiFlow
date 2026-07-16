import type { User } from "@supabase/supabase-js";

import {
  AUTH_ROUTES,
  ONBOARDING_ROUTES,
  APP_ROUTES,
  sanitizeNextPath,
} from "@/lib/auth/routes";
import type { OnboardingStep } from "@/types/database";

export function isEmailVerified(user: User) {
  return Boolean(user.email_confirmed_at);
}

export function getPostAuthRedirect(options: {
  user: User;
  onboardingStep?: OnboardingStep | null;
  next?: string | null;
}) {
  const { user, onboardingStep, next } = options;

  if (!isEmailVerified(user)) {
    return AUTH_ROUTES.verifyEmail;
  }

  if (onboardingStep === "connect_instagram") {
    return ONBOARDING_ROUTES.connectInstagram;
  }

  if (onboardingStep === "verify_email") {
    return AUTH_ROUTES.verifyEmail;
  }

  return sanitizeNextPath(next, APP_ROUTES.dashboard);
}

export function shouldRedirectAuthenticatedFromAuth(pathname: string) {
  return pathname === AUTH_ROUTES.login || pathname === AUTH_ROUTES.signup;
}

import { getAppUrl } from "@/lib/env";

export function getAuthCallbackUrl(next?: string) {
  const appUrl = getAppUrl();
  const params = new URLSearchParams();

  if (next) {
    params.set("next", next);
  }

  const query = params.toString();
  return query ? `${appUrl}/auth/callback?${query}` : `${appUrl}/auth/callback`;
}

export function getPasswordResetRedirectUrl() {
  return getAuthCallbackUrl("/reset-password");
}

export function getSignupEmailRedirectUrl() {
  return getAuthCallbackUrl("/onboarding/connect-instagram");
}

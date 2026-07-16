export const PRODUCTION_APP_URL = "https://verdiflowai.vercel.app";

export const AUTH_REDIRECT_PATHS = {
  callback: "/auth/callback",
  resetPassword: "/reset-password",
  onboarding: "/onboarding/connect-instagram",
} as const;

export function getProductionRedirectAllowList() {
  const appUrl = PRODUCTION_APP_URL;

  return [
    appUrl,
    `${appUrl}${AUTH_REDIRECT_PATHS.callback}`,
    `${appUrl}${AUTH_REDIRECT_PATHS.callback}/**`,
    `${appUrl}${AUTH_REDIRECT_PATHS.resetPassword}`,
    `${appUrl}${AUTH_REDIRECT_PATHS.onboarding}`,
    "http://localhost:3000/auth/callback",
    "http://localhost:3000/auth/callback/**",
    "http://localhost:3000/reset-password",
  ];
}

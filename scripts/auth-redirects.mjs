export const PRODUCTION_APP_URL = "https://verdiflowai.vercel.app";

export function getAuthRedirectAllowList(appUrl = PRODUCTION_APP_URL) {
  return [
    appUrl,
    `${appUrl}/auth/callback`,
    `${appUrl}/auth/callback/**`,
    `${appUrl}/reset-password`,
    `${appUrl}/onboarding/connect-instagram`,
    "http://localhost:3000/auth/callback",
    "http://localhost:3000/auth/callback/**",
    "http://localhost:3000/reset-password",
  ];
}

export function getAuthConfigPayload(appUrl = PRODUCTION_APP_URL) {
  return {
    site_url: appUrl,
    uri_allow_list: getAuthRedirectAllowList(appUrl).join(","),
  };
}

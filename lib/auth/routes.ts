export const AUTH_ROUTES = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verifyEmail: "/verify-email",
  resetPassword: "/reset-password",
  callback: "/auth/callback",
} as const;

export const ONBOARDING_ROUTES = {
  connectInstagram: "/onboarding/connect-instagram",
} as const;

export const APP_ROUTES = {
  home: "/",
  landing: "/landing",
  dashboard: "/dashboard",
} as const;

export const PUBLIC_PATHS = new Set([
  APP_ROUTES.home,
  APP_ROUTES.landing,
  AUTH_ROUTES.login,
  AUTH_ROUTES.signup,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.callback,
]);

export const AUTH_ONLY_PATHS = new Set([
  AUTH_ROUTES.login,
  AUTH_ROUTES.signup,
  AUTH_ROUTES.forgotPassword,
]);

export const PROTECTED_PREFIXES = ["/dashboard", "/onboarding"] as const;

export function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string) {
  return (AUTH_ONLY_PATHS as Set<string>).has(pathname);
}

export function sanitizeNextPath(next: string | null | undefined, fallback = APP_ROUTES.dashboard) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }

  if (next.startsWith("/auth") || isAuthPath(next)) {
    return fallback;
  }

  return next;
}

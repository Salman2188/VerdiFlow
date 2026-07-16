import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  AUTH_ROUTES,
  ONBOARDING_ROUTES,
  APP_ROUTES,
  isAuthPath,
  isProtectedPath,
  sanitizeNextPath,
} from "@/lib/auth/routes";
import { getPostAuthRedirect, isEmailVerified } from "@/lib/auth/session";
import { hasSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";
import type { OnboardingStep } from "@/types/database";

function buildLoginRedirect(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  redirectUrl.pathname = AUTH_ROUTES.login;
  redirectUrl.search = "";

  if (next && next !== "/" && isProtectedPath(next)) {
    redirectUrl.searchParams.set("next", next);
  }

  return NextResponse.redirect(redirectUrl);
}

async function getOnboardingStep(
  supabase: ReturnType<typeof createServerClient<Database>>,
  userId: string,
): Promise<OnboardingStep | null> {
  const { data, error } = await supabase
    .from("user_onboarding")
    .select("current_step")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("does not exist")) {
      return "connect_instagram";
    }

    return null;
  }

  return data?.current_step ?? null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  if (!hasSupabaseEnv()) {
    return supabaseResponse;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = isProtectedPath(pathname);
  const isAuthRoute = isAuthPath(pathname);
  const isVerifyEmailRoute = pathname === AUTH_ROUTES.verifyEmail;
  const isResetPasswordRoute = pathname === AUTH_ROUTES.resetPassword;
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isCallbackRoute = pathname.startsWith("/auth/");

  if (!user && isProtected) {
    return buildLoginRedirect(request);
  }

  if (!user && isVerifyEmailRoute) {
    const hasEmailHint = request.nextUrl.searchParams.has("email");
    if (!hasEmailHint) {
      return buildLoginRedirect(request);
    }
  } else if (!user && isResetPasswordRoute) {
    return buildLoginRedirect(request);
  }

  if (user && isAuthRoute) {
    const onboardingStep = await getOnboardingStep(supabase, user.id);
    const destination = getPostAuthRedirect({
      user,
      onboardingStep,
      next: request.nextUrl.searchParams.get("next"),
    });
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (user && !isEmailVerified(user) && !isVerifyEmailRoute && !isCallbackRoute) {
    if (isProtected || isOnboardingRoute || pathname === APP_ROUTES.home) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = AUTH_ROUTES.verifyEmail;
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (user && isEmailVerified(user) && isVerifyEmailRoute) {
    const onboardingStep = await getOnboardingStep(supabase, user.id);
    const destination = getPostAuthRedirect({ user, onboardingStep });
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (user && isEmailVerified(user) && isProtected && pathname.startsWith("/dashboard")) {
    const onboardingStep = await getOnboardingStep(supabase, user.id);

    if (onboardingStep === "connect_instagram") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = ONBOARDING_ROUTES.connectInstagram;
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (user && isEmailVerified(user) && isOnboardingRoute) {
    const onboardingStep = await getOnboardingStep(supabase, user.id);

    if (onboardingStep === "completed") {
      const next = sanitizeNextPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  if (user && isResetPasswordRoute && !isEmailVerified(user)) {
    return supabaseResponse;
  }

  return supabaseResponse;
}

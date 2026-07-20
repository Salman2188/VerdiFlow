import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { skipOnboardingForUser } from "@/lib/auth/skip-onboarding";
import { AUTH_ROUTES, APP_ROUTES } from "@/lib/auth/routes";
import { isEmailVerified } from "@/lib/auth/session";
import { getSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";

function loginRedirect(request: Request) {
  return NextResponse.redirect(new URL(AUTH_ROUTES.login, request.url));
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();
  let response = NextResponse.redirect(new URL(APP_ROUTES.dashboard, request.url));

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Route handlers can still attach refreshed cookies to the response.
          }
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const authUser = user ?? session?.user;

  if (error && !authUser) {
    return loginRedirect(request);
  }

  if (!authUser || !isEmailVerified(authUser)) {
    return loginRedirect(request);
  }

  await skipOnboardingForUser(supabase, authUser.id);

  return response;
}

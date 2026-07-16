import { NextResponse } from "next/server";

import { sanitizeNextPath } from "@/lib/auth/routes";
import {
  ensureOnboardingRow,
  getOnboardingState,
  syncEmailVerificationStep,
} from "@/lib/auth/onboarding";
import { getPostAuthRedirect, isEmailVerified } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = sanitizeNextPath(requestUrl.searchParams.get("next"));
  const appUrl = getAppUrl();

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${appUrl}/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${appUrl}/login`);
  }

  await ensureOnboardingRow(user.id);

  if (isEmailVerified(user) && user.email_confirmed_at) {
    await syncEmailVerificationStep(user.id, user.email_confirmed_at);
  }

  const onboarding =
    (await getOnboardingState(user.id)) ?? (await ensureOnboardingRow(user.id));

  const destination = getPostAuthRedirect({
    user,
    onboardingStep: onboarding?.current_step ?? (isEmailVerified(user) ? "connect_instagram" : "verify_email"),
    next,
  });

  return NextResponse.redirect(`${appUrl}${destination}`);
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  AUTH_ROUTES,
  APP_ROUTES,
  sanitizeNextPath,
} from "@/lib/auth/routes";
import { getPostAuthRedirect, isEmailVerified } from "@/lib/auth/session";
import {
  ensureOnboardingRow,
  getOnboardingState,
  syncEmailVerificationStep,
} from "@/lib/auth/onboarding";
import {
  getMagicLinkRedirectUrl,
  getPasswordResetRedirectUrl,
  getSignupEmailRedirectUrl,
} from "@/lib/auth/redirects";
import { mapAuthError } from "@/lib/auth/errors";
import { createActionClient, createClient } from "@/lib/supabase/server";
import { skipOnboardingForUser } from "@/lib/auth/skip-onboarding";

export type AuthActionState = {
  error?: string;
  success?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function resolvePostAuthRedirect(next?: string | null) {
  const { user } = await createActionClient();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  if (isEmailVerified(user) && user.email_confirmed_at) {
    await syncEmailVerificationStep(user.id, user.email_confirmed_at);
  }

  const onboarding = (await getOnboardingState(user.id)) ?? (await ensureOnboardingRow(user.id));

  redirect(
    getPostAuthRedirect({
      user,
      onboardingStep: onboarding?.current_step ?? "connect_instagram",
      next,
    }),
  );
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = getString(formData, "fullName");
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!fullName || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: getSignupEmailRedirectUrl(),
    },
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  if (data.user) {
    await ensureOnboardingRow(data.user.id);
  }

  redirect(`${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(email)}`);
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = sanitizeNextPath(getString(formData, "next"));

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  if (!data.user) {
    return { error: "Unable to sign in. Please try again." };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionUser = data.user ?? session?.user;

  if (!sessionUser) {
    return { error: "Unable to establish a session. Please try again." };
  }

  if (!isEmailVerified(data.user)) {
    redirect(AUTH_ROUTES.verifyEmail);
  }

  if (sessionUser.email_confirmed_at) {
    await syncEmailVerificationStep(sessionUser.id, sessionUser.email_confirmed_at);
  }

  const onboarding =
    (await getOnboardingState(sessionUser.id)) ??
    (await ensureOnboardingRow(sessionUser.id));

  redirect(
    getPostAuthRedirect({
      user: sessionUser,
      onboardingStep: onboarding?.current_step ?? "connect_instagram",
      next,
    }),
  );
}

export async function forgotPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getPasswordResetRedirectUrl(),
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  return {
    success: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function resetPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = getString(formData, "password");
  const confirmPassword = getString(formData, "confirmPassword");

  if (!password || !confirmPassword) {
    return { error: "Please fill in both password fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect(AUTH_ROUTES.login);
}

export async function resendVerificationAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");

  if (!email) {
    return { error: "Missing email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: getSignupEmailRedirectUrl(),
    },
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  return { success: "Verification email sent. Check your inbox." };
}

export async function magicLinkAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = getString(formData, "email");
  const next = sanitizeNextPath(getString(formData, "next"));

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getMagicLinkRedirectUrl(next),
      shouldCreateUser: false,
    },
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  return {
    success: "Magic link sent. Check your inbox and open the link to sign in.",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(AUTH_ROUTES.login);
}

export async function skipInstagramOnboardingAction() {
  const { supabase, user } = await createActionClient();

  if (!user || !isEmailVerified(user)) {
    redirect(AUTH_ROUTES.login);
  }

  await skipOnboardingForUser(supabase, user.id);
  redirect(APP_ROUTES.dashboard);
}

export async function continueAfterVerificationAction() {
  redirect(AUTH_ROUTES.login);
}

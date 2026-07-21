import type { AuthError, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";

import { AUTH_ROUTES } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/server";

export function isAuthSessionMissingError(error: unknown): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as AuthError).name === "AuthSessionMissingError"
  );
}

type ResolveAuthUserOptions = {
  redirectTo?: string;
};

export const resolveAuthUser = cache(async (
  _options: ResolveAuthUserOptions = {},
): Promise<User | null> => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return session.user;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    return user;
  }

  if (error) {
    if (isAuthSessionMissingError(error)) {
      return null;
    }

    throw error;
  }

  return null;
});

export async function requireAuthUser(options: ResolveAuthUserOptions = {}): Promise<User> {
  const user = await resolveAuthUser(options);

  if (!user) {
    redirect(options.redirectTo ?? AUTH_ROUTES.login);
  }

  return user;
}

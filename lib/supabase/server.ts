import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { cache } from "react";

import { getSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";

export const createClient = cache(async () => {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Server Components cannot mutate cookies. Middleware refreshes sessions
            // on navigation; Server Actions and Route Handlers can set cookies above.
          }
        });
      },
    },
  });
});

type ActionClientResult = {
  supabase: SupabaseClient<Database>;
  user: User | null;
};

/**
 * Reads the authenticated user for Server Actions, falling back to the session
 * cookie when JWT validation is unavailable in the action context.
 */
export async function createActionClient(): Promise<ActionClientResult> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return {
      supabase,
      user: session.user,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    user: user ?? null,
  };
}

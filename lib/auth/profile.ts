import "server-only";

import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type { SidebarUser } from "@/components/dashboard/sidebar/types";
import type { TopNavUser } from "@/components/dashboard/top-nav/types";

export type AuthenticatedNavUser = {
  sidebar: SidebarUser;
  topNav: TopNavUser;
};

function buildDisplayName(user: User, fullName?: string | null) {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  const metadataName = user.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user.email?.split("@")[0] ?? "User";
}

export async function getAuthenticatedNavUser(user: User): Promise<AuthenticatedNavUser> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, agency, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  const name = buildDisplayName(user, profile?.full_name);
  const email = profile?.email ?? user.email ?? "";
  const agency = profile?.agency ?? "VerdiFlow";

  return {
    sidebar: {
      name,
      agency,
      isOnline: true,
    },
    topNav: {
      name,
      agency,
      email,
      avatarUrl: profile?.avatar_url ?? undefined,
    },
  };
}

export async function getOptionalAuthenticatedNavUser(): Promise<AuthenticatedNavUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return getAuthenticatedNavUser(user);
}

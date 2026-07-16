import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { InstagramConnectionRow } from "@/types/database";

export type { InstagramConnectionRow };

export async function saveInstagramConnection(input: {
  userId: string;
  workspaceId: string;
  instagramAccountId: string;
  instagramUsername: string;
  facebookPageId: string;
  facebookPageName: string;
  accessToken: string;
  tokenExpiresAt: string | null;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("instagram_connections")
    .upsert(
      {
        workspace_id: input.workspaceId,
        user_id: input.userId,
        instagram_account_id: input.instagramAccountId,
        instagram_username: input.instagramUsername,
        facebook_page_id: input.facebookPageId,
        facebook_page_name: input.facebookPageName,
        access_token: input.accessToken,
        token_expires_at: input.tokenExpiresAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workspace_id" },
    )
    .select("id, workspace_id, user_id, instagram_account_id, instagram_username, facebook_page_id, facebook_page_name, connected_at")
    .single();

  if (error) {
    throw error;
  }

  const { error: onboardingError } = await supabase
    .from("user_onboarding")
    .update({
      current_step: "completed",
      instagram_connected_at: new Date().toISOString(),
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", input.userId);

  if (onboardingError) {
    throw onboardingError;
  }

  return data as InstagramConnectionRow;
}

export async function getInstagramConnectionForWorkspace(
  workspaceId: string,
): Promise<InstagramConnectionRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("instagram_connections")
    .select("id, workspace_id, user_id, instagram_account_id, instagram_username, facebook_page_id, facebook_page_name, connected_at")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("does not exist")) {
      return null;
    }
    throw error;
  }

  return (data as InstagramConnectionRow | null) ?? null;
}

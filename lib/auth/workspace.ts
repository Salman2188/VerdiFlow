import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { WorkspaceMemberRow, WorkspaceRow } from "@/types/database";

function isMissingWorkspaceTable(error: { code?: string; message?: string }) {
  return error.code === "PGRST205" || Boolean(error.message?.includes("does not exist"));
}

export async function getUserWorkspaces(userId: string): Promise<WorkspaceRow[]> {
  const supabase = await createClient();
  const { data: memberships, error: membershipError } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userId);

  if (membershipError) {
    if (isMissingWorkspaceTable(membershipError)) {
      return [];
    }

    throw membershipError;
  }

  const workspaceIds = (memberships ?? []).map((membership) => membership.workspace_id);
  if (workspaceIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase.from("workspaces").select("*").in("id", workspaceIds);

  if (error) {
    if (isMissingWorkspaceTable(error)) {
      return [];
    }

    throw error;
  }

  return data ?? [];
}

export async function getPrimaryWorkspace(userId: string): Promise<WorkspaceRow | null> {
  const workspaces = await getUserWorkspaces(userId);
  return workspaces.find((workspace) => workspace.owner_id === userId) ?? workspaces[0] ?? null;
}

export async function getWorkspaceMembership(
  userId: string,
): Promise<WorkspaceMemberRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workspace_members")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error) {
    if (isMissingWorkspaceTable(error)) {
      return null;
    }

    throw error;
  }

  return data;
}

import { NextResponse } from "next/server";

import { getPrimaryWorkspace } from "@/lib/auth/workspace";
import { ONBOARDING_ROUTES } from "@/lib/auth/routes";
import { getAppUrl } from "@/lib/env";
import {
  getMetaAppId,
  getMetaRedirectUri,
  hasMetaEnv,
  META_OAUTH_SCOPES,
} from "@/lib/integrations/meta/config";
import { buildMetaOAuthUrl, createMetaOAuthState } from "@/lib/integrations/meta/oauth";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const appUrl = getAppUrl();

  if (!hasMetaEnv()) {
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent("Instagram OAuth is not configured yet. Add META_APP_ID and META_APP_SECRET in Vercel.")}`,
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect("/login");
  }

  const workspace = await getPrimaryWorkspace(user.id);
  if (!workspace) {
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent("Workspace not found. Try signing out and back in.")}`,
    );
  }

  const state = createMetaOAuthState(user.id, workspace.id);
  const url = buildMetaOAuthUrl(
    state,
    getMetaAppId(),
    getMetaRedirectUri(),
    META_OAUTH_SCOPES,
  );

  return NextResponse.redirect(url);
}

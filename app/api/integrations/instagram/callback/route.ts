import { NextResponse } from "next/server";

import { APP_ROUTES, ONBOARDING_ROUTES } from "@/lib/auth/routes";
import { getAppUrl } from "@/lib/env";
import {
  getMetaAppId,
  getMetaAppSecret,
  getMetaRedirectUri,
} from "@/lib/integrations/meta/config";
import {
  exchangeMetaCodeForToken,
  exchangeMetaLongLivedToken,
  fetchConnectedInstagramAccount,
  parseMetaOAuthState,
} from "@/lib/integrations/meta/oauth";
import { saveInstagramConnection } from "@/lib/integrations/instagram/service";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const appUrl = getAppUrl();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const metaError = requestUrl.searchParams.get("error_description") ?? requestUrl.searchParams.get("error");

  if (metaError) {
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent(metaError)}`,
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent("Instagram authorization was cancelled.")}`,
    );
  }

  const parsedState = parseMetaOAuthState(state);
  if (!parsedState) {
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent("Invalid OAuth state. Try connecting again.")}`,
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== parsedState.userId) {
    return NextResponse.redirect("/login");
  }

  try {
    const redirectUri = getMetaRedirectUri();
    const appId = getMetaAppId();
    const appSecret = getMetaAppSecret();
    const shortLivedToken = await exchangeMetaCodeForToken(code, redirectUri, appId, appSecret);
    const longLived = await exchangeMetaLongLivedToken(shortLivedToken, appId, appSecret);
    const instagram = await fetchConnectedInstagramAccount(longLived.accessToken);

    await saveInstagramConnection({
      userId: user.id,
      workspaceId: parsedState.workspaceId,
      instagramAccountId: instagram.instagramAccountId,
      instagramUsername: instagram.instagramUsername,
      facebookPageId: instagram.facebookPageId,
      facebookPageName: instagram.facebookPageName,
      accessToken: instagram.pageAccessToken,
      tokenExpiresAt: longLived.expiresIn
        ? new Date(Date.now() + longLived.expiresIn * 1000).toISOString()
        : null,
    });

    return NextResponse.redirect(`${appUrl}${APP_ROUTES.dashboard}?connected=instagram`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to connect Instagram account.";
    return NextResponse.redirect(
      `${appUrl}${ONBOARDING_ROUTES.connectInstagram}?error=${encodeURIComponent(message)}`,
    );
  }
}

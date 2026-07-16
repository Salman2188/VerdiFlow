import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { getMetaOAuthStateSecret } from "@/lib/integrations/meta/config";

type OAuthStatePayload = {
  userId: string;
  workspaceId: string;
  nonce: string;
};

function encodePayload(payload: OAuthStatePayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(encoded: string): OAuthStatePayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as OAuthStatePayload;
    if (!parsed.userId || !parsed.workspaceId || !parsed.nonce) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function sign(encoded: string) {
  return createHmac("sha256", getMetaOAuthStateSecret()).update(encoded).digest("base64url");
}

export function createMetaOAuthState(userId: string, workspaceId: string) {
  const payload: OAuthStatePayload = {
    userId,
    workspaceId,
    nonce: randomBytes(16).toString("hex"),
  };
  const encoded = encodePayload(payload);
  return `${encoded}.${sign(encoded)}`;
}

export function parseMetaOAuthState(state: string) {
  const [encoded, signature] = state.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const expected = sign(encoded);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  return decodePayload(encoded);
}

export function buildMetaOAuthUrl(state: string, appId: string, redirectUri: string, scopes: string) {
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: scopes,
    response_type: "code",
    state,
  });

  return `https://www.facebook.com/v23.0/dialog/oauth?${params.toString()}`;
}

type MetaTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: { message: string };
};

type MetaPage = {
  id: string;
  name: string;
  access_token: string;
  instagram_business_account?: { id: string };
};

type MetaPagesResponse = {
  data?: MetaPage[];
  error?: { message: string };
};

type MetaInstagramAccountResponse = {
  username?: string;
  error?: { message: string };
};

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function exchangeMetaCodeForToken(code: string, redirectUri: string, appId: string, appSecret: string) {
  const params = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch(`https://graph.facebook.com/v23.0/oauth/access_token?${params.toString()}`);
  const body = await parseJson<MetaTokenResponse>(response);

  if (!response.ok || !body.access_token) {
    throw new Error(body.error?.message ?? "Meta token exchange failed.");
  }

  return body.access_token;
}

export async function exchangeMetaLongLivedToken(shortLivedToken: string, appId: string, appSecret: string) {
  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: shortLivedToken,
  });

  const response = await fetch(`https://graph.facebook.com/v23.0/oauth/access_token?${params.toString()}`);
  const body = await parseJson<MetaTokenResponse>(response);

  if (!response.ok || !body.access_token) {
    throw new Error(body.error?.message ?? "Meta long-lived token exchange failed.");
  }

  return {
    accessToken: body.access_token,
    expiresIn: body.expires_in ?? null,
  };
}

export async function fetchConnectedInstagramAccount(userAccessToken: string) {
  const params = new URLSearchParams({
    fields: "id,name,access_token,instagram_business_account{id,username}",
    access_token: userAccessToken,
  });

  const response = await fetch(`https://graph.facebook.com/v23.0/me/accounts?${params.toString()}`);
  const body = await parseJson<MetaPagesResponse>(response);

  if (!response.ok) {
    throw new Error(body.error?.message ?? "Unable to load Facebook Pages.");
  }

  const page = (body.data ?? []).find((entry) => entry.instagram_business_account?.id);
  if (!page?.instagram_business_account?.id || !page.access_token) {
    throw new Error(
      "No Instagram Business account found. Link Instagram to a Facebook Page, then try again.",
    );
  }

  let username = page.instagram_business_account.id;
  const igParams = new URLSearchParams({
    fields: "username",
    access_token: page.access_token,
  });
  const igResponse = await fetch(
    `https://graph.facebook.com/v23.0/${page.instagram_business_account.id}?${igParams.toString()}`,
  );
  const igBody = await parseJson<MetaInstagramAccountResponse>(igResponse);
  if (igResponse.ok && igBody.username) {
    username = igBody.username;
  }

  return {
    facebookPageId: page.id,
    facebookPageName: page.name,
    instagramAccountId: page.instagram_business_account.id,
    instagramUsername: username,
    pageAccessToken: page.access_token,
  };
}

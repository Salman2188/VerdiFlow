import { getAppUrl } from "@/lib/env";

export const META_OAUTH_SCOPES = [
  "instagram_basic",
  "instagram_manage_messages",
  "pages_show_list",
  "pages_read_engagement",
  "business_management",
].join(",");

export function hasMetaEnv() {
  return Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET);
}

export function getMetaAppId() {
  const appId = process.env.META_APP_ID;
  if (!appId) {
    throw new Error("Missing META_APP_ID.");
  }
  return appId;
}

export function getMetaAppSecret() {
  const secret = process.env.META_APP_SECRET;
  if (!secret) {
    throw new Error("Missing META_APP_SECRET.");
  }
  return secret;
}

export function getMetaRedirectUri() {
  const configured = process.env.META_REDIRECT_URI?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  return `${getAppUrl()}/api/integrations/instagram/callback`;
}

export function getMetaOAuthStateSecret() {
  return process.env.META_OAUTH_STATE_SECRET ?? process.env.META_APP_SECRET ?? "dev-meta-state-secret";
}

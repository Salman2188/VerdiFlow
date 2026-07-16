"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ONBOARDING_ROUTES } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/client";

/**
 * Supabase built-in email sometimes redirects to site_url with tokens in the hash
 * instead of /auth/callback?code=...
 */
export function AuthHashHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : "";

    if (!hash.includes("access_token")) {
      return;
    }

    let cancelled = false;

    async function consumeHash() {
      const hashParams = new URLSearchParams(hash);
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");

      if (!accessToken || !refreshToken) {
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (cancelled) {
        return;
      }

      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error.message)}`);
        return;
      }

      window.history.replaceState(null, "", window.location.pathname + window.location.search);

      if (type === "recovery") {
        router.replace("/reset-password");
        return;
      }

      router.replace(ONBOARDING_ROUTES.connectInstagram);
      router.refresh();
    }

    void consumeHash();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}

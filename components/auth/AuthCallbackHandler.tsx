"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { sanitizeNextPath } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/client";

export function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    let cancelled = false;

    async function completeAuth() {
      const supabase = createClient();
      const code = searchParams.get("code");
      const next = sanitizeNextPath(searchParams.get("next"));
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : "";
      const hashParams = new URLSearchParams(hash);
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");

      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            throw error;
          }
        } else {
          router.replace("/login");
          return;
        }

        if (cancelled) {
          return;
        }

        if (type === "recovery") {
          router.replace("/reset-password");
          return;
        }

        router.replace(next);
        router.refresh();
      } catch (error) {
        if (cancelled) {
          return;
        }

        const detail =
          error instanceof Error ? error.message : "Unable to complete sign-in.";
        setMessage(detail);
        router.replace(`/login?error=${encodeURIComponent(detail)}`);
      }
    }

    void completeAuth();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b0a] px-4 text-sm text-zinc-400">
      {message}
    </div>
  );
}

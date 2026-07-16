import { AtSign, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { signOutAction, skipInstagramOnboardingAction } from "@/lib/auth/actions";
import { requireVerifiedUser } from "@/lib/auth/server";
import { getPrimaryWorkspace } from "@/lib/auth/workspace";
import { hasMetaEnv } from "@/lib/integrations/meta/config";
import { getInstagramConnectionForWorkspace } from "@/lib/integrations/instagram/service";

export const metadata: Metadata = {
  title: "Connect Instagram | VerdiFlow",
};

export const dynamic = "force-dynamic";

type ConnectInstagramPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ConnectInstagramPage({ searchParams }: ConnectInstagramPageProps) {
  const user = await requireVerifiedUser();
  const params = await searchParams;
  const workspace = await getPrimaryWorkspace(user.id);
  const existingConnection = workspace
    ? await getInstagramConnectionForWorkspace(workspace.id)
    : null;
  const metaConfigured = hasMetaEnv();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b0a] px-4 py-12 text-zinc-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_55%)]"
      />

      <div className="relative w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Step 2 of 2
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Connect your Instagram Business account
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
            VerdiFlow uses Instagram to capture DMs, create leads, and run automations for you.
            You will not need ManyChat, Make, or any external setup.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e0c]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Secure OAuth",
                copy: "VerdiFlow connects through Meta. We never see your Instagram password.",
              },
              {
                icon: AtSign,
                title: "Business account",
                copy: "Use an Instagram Business account linked to a Facebook Page.",
              },
              {
                icon: Sparkles,
                title: "Instant setup",
                copy: "Once connected, leads and automations start inside VerdiFlow.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4"
              >
                <item.icon className="h-5 w-5 text-emerald-300" strokeWidth={1.75} />
                <h2 className="mt-3 text-sm font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-xs leading-6 text-zinc-500">{item.copy}</p>
              </div>
            ))}
          </div>

          {params.error ? (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
              {params.error}
            </div>
          ) : null}

          {existingConnection ? (
            <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-6 text-center">
              <p className="text-sm font-medium text-white">
                Connected as @{existingConnection.instagram_username ?? existingConnection.instagram_account_id}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Instagram is linked to {existingConnection.facebook_page_name ?? "your Facebook Page"}.
              </p>
              <form action={skipInstagramOnboardingAction} className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400"
                >
                  Continue to dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-6 text-center">
              <p className="text-sm font-medium text-white">Connect through Meta OAuth</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {metaConfigured
                  ? "Authorize VerdiFlow to access your Instagram Business inbox and linked Facebook Page."
                  : "Add META_APP_ID and META_APP_SECRET in Vercel to enable one-click Instagram connection."}
              </p>
              {metaConfigured ? (
                <Link
                  href="/api/integrations/instagram/connect"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition-all hover:bg-emerald-400"
                >
                  Connect Instagram Business
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-emerald-500/40 px-5 py-3 text-sm font-semibold text-emerald-950/70"
                >
                  Connect Instagram Business
                </button>
              )}
              <form action={skipInstagramOnboardingAction} className="mt-4">
                <button
                  type="submit"
                  className="text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
                >
                  Skip for now — continue to dashboard
                </button>
              </form>
            </div>
          )}
        </div>

        <form action={signOutAction} className="mt-6 text-center">
          <button
            type="submit"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

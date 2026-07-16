import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const envPath = resolve(process.cwd(), ".env.local");

if (!existsSync(envPath)) {
  console.error("FAIL: .env.local not found.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey) {
  console.error("FAIL: Missing Supabase env vars in .env.local.");
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const checks = [
  {
    name: "workspaces table",
    run: () => supabase.from("workspaces").select("id").limit(1),
  },
  {
    name: "workspace_members table",
    run: () => supabase.from("workspace_members").select("workspace_id").limit(1),
  },
  {
    name: "user_onboarding table",
    run: () => supabase.from("user_onboarding").select("user_id").limit(1),
  },
  {
    name: "leads.workspace_id column",
    run: () => supabase.from("leads").select("workspace_id").limit(1),
  },
];

for (const check of checks) {
  const { error } = await check.run();

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("does not exist")) {
      console.error(`FAIL: Missing ${check.name}. Run: npm run migrate:all`);
      process.exit(1);
    }

    console.error(`FAIL: ${check.name}:`, error.message);
    process.exit(1);
  }

  console.log(`OK: ${check.name}`);
}

if (serviceRoleKey) {
  const admin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: users, error: usersError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  if (usersError) {
    console.error("WARN: Could not inspect auth users:", usersError.message);
  } else {
    for (const user of users.users) {
      const { data: membership, error: membershipError } = await admin
        .from("workspace_members")
        .select("workspace_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (membershipError) {
        console.error(`FAIL: workspace membership lookup for ${user.email}:`, membershipError.message);
        process.exit(1);
      }

      if (!membership) {
        console.error(`FAIL: User ${user.email ?? user.id} has no workspace membership.`);
        process.exit(1);
      }

      const { data: workspace, error: workspaceError } = await admin
        .from("workspaces")
        .select("id, owner_id")
        .eq("id", membership.workspace_id)
        .maybeSingle();

      if (workspaceError || !workspace) {
        console.error(`FAIL: Workspace missing for user ${user.email ?? user.id}.`);
        process.exit(1);
      }

      if (workspace.owner_id !== user.id && membership.role !== "owner") {
        console.warn(`WARN: User ${user.email ?? user.id} is not workspace owner (may be invited member).`);
      } else {
        console.log(`OK: User ${user.email ?? user.id} linked to workspace ${workspace.id}`);
      }
    }
  }
} else {
  console.log("NOTE: Set SUPABASE_SERVICE_ROLE_KEY to verify user→workspace bootstrap automatically.");
}

console.log("OK: Phase 1 auth schema is ready.");

import { createClient } from "@/lib/supabase/client";

export function getSupabaseClient() {
  return createClient();
}

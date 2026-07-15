import { DEFAULT_SETTINGS_DATA } from "@/components/dashboard/settings/settings-data";
import type { SettingsData } from "@/components/dashboard/settings";

import { simulateLatency } from "./shared";

export async function getSettings(): Promise<SettingsData> {
  await simulateLatency(400);

  // const supabase = await createClient();
  // const { data, error } = await supabase.from("agency_settings").select("*").single();
  // if (error) throw error;
  // return mapToSettingsData(data);

  return DEFAULT_SETTINGS_DATA;
}

export async function updateSettings(settings: SettingsData): Promise<SettingsData> {
  await simulateLatency(300);

  // const supabase = await createClient();
  // const { data, error } = await supabase.from("agency_settings").upsert(settings).select().single();
  // if (error) throw error;
  // return mapToSettingsData(data);

  return settings;
}

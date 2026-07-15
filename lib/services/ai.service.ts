import { DEFAULT_AI_ASSISTANT_DATA } from "@/components/dashboard/ai-assistant/ai-assistant-data";
import type { AiAssistantData } from "@/components/dashboard/ai-assistant";

import { simulateLatency } from "./shared";

export async function getAiAssistantData(): Promise<AiAssistantData> {
  await simulateLatency(400);

  // const supabase = await createClient();
  // const { data, error } = await supabase.rpc("get_ai_assistant_data");
  // if (error) throw error;
  // return mapToAiAssistantData(data);

  return DEFAULT_AI_ASSISTANT_DATA;
}

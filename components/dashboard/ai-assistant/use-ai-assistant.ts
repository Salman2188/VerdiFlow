"use client";

import { useEffect, useState } from "react";

import { getAiAssistantData } from "@/lib/services/ai.service";

import type { AiAssistantData } from "./types";

type UseAiAssistantResult = {
  data: AiAssistantData | null;
  isLoading: boolean;
};

export function useAiAssistant(): UseAiAssistantResult {
  const [data, setData] = useState<AiAssistantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const result = await getAiAssistantData();
        if (!cancelled) setData(result);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading };
}

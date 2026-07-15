"use client";

import { useEffect, useState } from "react";

import { getAnalytics } from "@/lib/services/analytics.service";
import type { AnalyticsData } from "./types";

type UseAnalyticsResult = {
  data: AnalyticsData | null;
  isLoading: boolean;
};

export function useAnalytics(): UseAnalyticsResult {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const result = await getAnalytics();
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

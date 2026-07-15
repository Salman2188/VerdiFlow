"use client";

import { useEffect, useState } from "react";

import { getSettings } from "@/lib/services/settings.service";

import type { SettingsData } from "./types";

type UseSettingsResult = {
  data: SettingsData | null;
  isLoading: boolean;
  updateData: (updater: (current: SettingsData) => SettingsData) => void;
};

export function useSettings(): UseSettingsResult {
  const [data, setData] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const result = await getSettings();
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

  const updateData = (updater: (current: SettingsData) => SettingsData) => {
    setData((current) => (current ? updater(current) : current));
  };

  return { data, isLoading, updateData };
}

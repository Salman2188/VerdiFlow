"use client";

import { useEffect, useState } from "react";

import { getLeads } from "@/lib/services/lead.service";

import type { Lead } from "./types";

type UseLeadsResult = {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
};

export function useLeads(initialLeads?: Lead[]) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = initialLeads ?? (await getLeads());
        if (!cancelled) {
          setLeads(data);
        }
      } catch {
        if (!cancelled) {
          setError("Kunne ikke laste leads. Prøv igjen.");
          setLeads([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [initialLeads]);

  return { leads, isLoading, error };
}

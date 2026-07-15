"use client";

import { useEffect, useState } from "react";

import { getLeadDetail } from "@/lib/services/lead.service";

import type { LeadDetail } from "./types";

type UseLeadDetailResult = {
  detail: LeadDetail | null;
  isLoading: boolean;
  notFound: boolean;
  error: string | null;
};

export function useLeadDetail(id: string): UseLeadDetailResult {
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const data = await getLeadDetail(id);
        if (cancelled) return;

        if (!data) {
          setNotFound(true);
          setDetail(null);
        } else {
          setDetail(data);
        }
      } catch {
        if (!cancelled) {
          setError("Kunne ikke laste leaddetaljer. Prøv igjen.");
          setDetail(null);
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
  }, [id]);

  return { detail, isLoading, notFound, error };
}

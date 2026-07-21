import type { ReactNode } from "react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

type DetailSectionProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

/** Lead Intelligence sections — neutral badge variant of AiSection */
export function DetailSection(props: DetailSectionProps) {
  return <AiSection {...props} badgeVariant="neutral" />;
}

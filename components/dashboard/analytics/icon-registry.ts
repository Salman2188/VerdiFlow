import {
  Bot,
  Circle,
  Clock,
  FileCheck,
  MessageSquare,
  Share2,
  Timer,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ANALYTICS_ICON_NAMES = [
  "message-square",
  "clock",
  "file-check",
  "zap",
  "timer",
  "share-2",
  "trending-up",
  "bot",
] as const;

export type AnalyticsIconName = (typeof ANALYTICS_ICON_NAMES)[number];

export const ANALYTICS_ICONS: Record<AnalyticsIconName, LucideIcon> = {
  "message-square": MessageSquare,
  clock: Clock,
  "file-check": FileCheck,
  zap: Zap,
  timer: Timer,
  "share-2": Share2,
  "trending-up": TrendingUp,
  bot: Bot,
};

export function getAnalyticsIcon(icon: AnalyticsIconName | string): LucideIcon {
  if (typeof icon === "string" && icon in ANALYTICS_ICONS) {
    return ANALYTICS_ICONS[icon as AnalyticsIconName];
  }

  return Circle;
}

import {
  BarChart3,
  Kanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import type { SidebarNavItem } from "./types";

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
  { label: "AI Assistant", href: "/dashboard/ai", icon: Sparkles },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const DEFAULT_SIDEBAR_USER = {
  name: "Alex Rivera",
  agency: "Compass Realty Group",
  isOnline: true,
};

import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type SidebarUser = {
  name: string;
  agency: string;
  avatarUrl?: string;
  isOnline?: boolean;
};

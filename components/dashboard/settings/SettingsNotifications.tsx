import { Bell } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { SettingsToggle } from "./SettingsControls";
import type { NotificationSettings } from "./types";

type SettingsNotificationsProps = {
  notifications: NotificationSettings;
  onChange: (notifications: NotificationSettings) => void;
};

export function SettingsNotifications({
  notifications,
  onChange,
}: SettingsNotificationsProps) {
  const update = <K extends keyof NotificationSettings>(
    field: K,
    value: NotificationSettings[K],
  ) => {
    onChange({ ...notifications, [field]: value });
  };

  const toggles: {
    field: keyof NotificationSettings;
    label: string;
    description?: string;
  }[] = [
    { field: "email", label: "E-postvarsler", description: "Motta varsler på e-post" },
    { field: "sms", label: "SMS-varsler", description: "Viktige varsler via SMS" },
    { field: "push", label: "Push-varsler", description: "Mobilvarsler i sanntid" },
    { field: "desktop", label: "Desktop-varsler", description: "Varsler i nettleseren" },
    { field: "leadAlerts", label: "Lead-varsler", description: "Nye leads og oppdateringer" },
    {
      field: "highPriorityAlerts",
      label: "Høy prioritet-varsler",
      description: "Kritiske handlinger som krever umiddelbar oppmerksomhet",
    },
    {
      field: "meetingReminders",
      label: "Møtepåminnelser",
      description: "Visninger og avtaler",
    },
  ];

  return (
    <AiSection
      title="Varsler"
      subtitle="Velg hvordan du vil bli varslet"
      icon={<Bell className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {toggles.map((toggle) => (
          <SettingsToggle
            key={toggle.field}
            label={toggle.label}
            description={toggle.description}
            checked={notifications[toggle.field]}
            onChange={(v) => update(toggle.field, v)}
          />
        ))}
      </div>
    </AiSection>
  );
}

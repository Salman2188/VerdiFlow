import { User } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { SettingsInput, SettingsSaveButton, SettingsSelect } from "./SettingsControls";
import type { ProfileSettings } from "./types";

type SettingsProfileProps = {
  profile: ProfileSettings;
  onChange: (profile: ProfileSettings) => void;
};

export function SettingsProfile({ profile, onChange }: SettingsProfileProps) {
  const update = (field: keyof ProfileSettings, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <AiSection
      title="Profil"
      subtitle="Din personlige konto"
      icon={<User className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] text-lg font-bold text-white">
          {profile.avatarInitials}
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <SettingsInput label="Navn" value={profile.name} onChange={(v) => update("name", v)} />
          <SettingsInput
            label="Stilling"
            value={profile.role}
            onChange={(v) => update("role", v)}
          />
          <SettingsInput
            label="Telefon"
            value={profile.phone}
            onChange={(v) => update("phone", v)}
          />
          <SettingsInput
            label="E-post"
            type="email"
            value={profile.email}
            onChange={(v) => update("email", v)}
          />
          <div className="sm:col-span-2">
            <SettingsSelect
              label="Språk"
              value={profile.language}
              onChange={(v) => update("language", v)}
              options={[
                { value: "Norsk", label: "Norsk" },
                { value: "English", label: "English" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SettingsSaveButton />
      </div>
    </AiSection>
  );
}

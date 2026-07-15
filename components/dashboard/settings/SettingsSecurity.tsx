import { KeyRound, Monitor, Shield } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { SettingsSaveButton, SettingsToggle } from "./SettingsControls";
import type { SecuritySettings } from "./types";

type SettingsSecurityProps = {
  security: SecuritySettings;
  onChange: (security: SecuritySettings) => void;
};

export function SettingsSecurity({ security, onChange }: SettingsSecurityProps) {
  return (
    <AiSection
      title="Sikkerhet"
      subtitle="Passord, 2FA og aktive økter"
      icon={<Shield className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.04] bg-black/15 p-4">
            <div className="flex items-center gap-3">
              <KeyRound className="h-4 w-4 text-zinc-500" strokeWidth={1.75} />
              <div>
                <p className="text-[13px] font-medium text-white">Passord</p>
                <p className="text-[11px] text-zinc-600">Sist endret for 42 dager siden</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 text-[11px] font-medium text-emerald-400/80 transition-colors hover:text-emerald-300"
            >
              Endre passord →
            </button>
          </div>

          <SettingsToggle
            label="Tofaktorautentisering (2FA)"
            description="Ekstra sikkerhet ved innlogging"
            checked={security.twoFactorEnabled}
            onChange={(v) => onChange({ ...security, twoFactorEnabled: v })}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/[0.04] bg-black/15 p-4">
            <p className="text-[11px] font-medium text-zinc-500">Siste innlogging</p>
            <p className="mt-1 text-[13px] font-medium text-white">{security.lastLogin}</p>
            <p className="mt-0.5 text-[11px] text-zinc-600">{security.lastLoginLocation}</p>
          </div>

          <div className="rounded-xl border border-white/[0.04] bg-black/15 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-white">Aktive økter</p>
              <span className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tabular-nums text-zinc-500">
                {security.activeSessions}
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {security.activeDevices.map((device) => (
                <li
                  key={device}
                  className="flex items-center gap-2 text-[11px] text-zinc-500"
                >
                  <Monitor className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                  {device}
                </li>
              ))}
            </ul>
          </div>

          <SettingsSaveButton label="Logg ut alle enheter" />
        </div>
      </div>
    </AiSection>
  );
}

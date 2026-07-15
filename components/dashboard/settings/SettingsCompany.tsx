import { Building2 } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { SettingsInput, SettingsSaveButton } from "./SettingsControls";
import type { CompanySettings } from "./types";

type SettingsCompanyProps = {
  company: CompanySettings;
  onChange: (company: CompanySettings) => void;
};

export function SettingsCompany({ company, onChange }: SettingsCompanyProps) {
  const update = (field: keyof CompanySettings, value: string) => {
    onChange({ ...company, [field]: value });
  };

  return (
    <AiSection
      title="Firma"
      subtitle="Bedriftsinformasjon og kontakt"
      icon={<Building2 className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.08] text-xl font-bold text-emerald-300">
          {company.logoInitials}
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <SettingsInput
            label="Firmanavn"
            value={company.name}
            onChange={(v) => update("name", v)}
          />
          <SettingsInput
            label="Telefon"
            value={company.phone}
            onChange={(v) => update("phone", v)}
          />
          <SettingsInput
            label="E-post"
            type="email"
            value={company.email}
            onChange={(v) => update("email", v)}
          />
          <SettingsInput
            label="Organisasjonsnummer"
            value={company.orgNumber}
            onChange={(v) => update("orgNumber", v)}
          />
          <div className="sm:col-span-2">
            <SettingsInput
              label="Adresse"
              value={company.address}
              onChange={(v) => update("address", v)}
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

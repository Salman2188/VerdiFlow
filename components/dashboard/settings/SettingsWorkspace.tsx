"use client";

import { dashboardPage } from "@/components/dashboard/dashboard-styles";

import { SettingsAi } from "./SettingsAi";
import { SettingsCompany } from "./SettingsCompany";
import { SettingsIntegrations } from "./SettingsIntegrations";
import { SettingsLoadingState } from "./SettingsLoadingState";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsProfile } from "./SettingsProfile";
import { SettingsSecurity } from "./SettingsSecurity";
import { SettingsSubscription } from "./SettingsSubscription";
import { useSettings } from "./use-settings";

export function SettingsWorkspace() {
  const { data, isLoading, updateData } = useSettings();

  if (isLoading || !data) {
    return <SettingsLoadingState />;
  }

  return (
    <div className={dashboardPage}>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <SettingsCompany
          company={data.company}
          onChange={(company) => updateData((d) => ({ ...d, company }))}
        />
        <SettingsProfile
          profile={data.profile}
          onChange={(profile) => updateData((d) => ({ ...d, profile }))}
        />
      </div>

      <SettingsAi ai={data.ai} onChange={(ai) => updateData((d) => ({ ...d, ai }))} />

      <SettingsNotifications
        notifications={data.notifications}
        onChange={(notifications) => updateData((d) => ({ ...d, notifications }))}
      />

      <SettingsIntegrations integrations={data.integrations} />

      <SettingsSecurity
        security={data.security}
        onChange={(security) => updateData((d) => ({ ...d, security }))}
      />

      <SettingsSubscription subscription={data.subscription} />
    </div>
  );
}

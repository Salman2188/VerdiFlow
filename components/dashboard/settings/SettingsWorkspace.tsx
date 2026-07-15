"use client";

import { useEffect, useState } from "react";

import { SettingsAi } from "./SettingsAi";
import { SettingsCompany } from "./SettingsCompany";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsIntegrations } from "./SettingsIntegrations";
import { SettingsLoadingState } from "./SettingsLoadingState";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsProfile } from "./SettingsProfile";
import { SettingsSecurity } from "./SettingsSecurity";
import { SettingsSubscription } from "./SettingsSubscription";
import { useSettings } from "./use-settings";

export function SettingsWorkspace() {
  const { data, isLoading, updateData } = useSettings();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    setReady(false);
  }, [isLoading]);

  if (isLoading || !data) {
    return <SettingsLoadingState />;
  }

  return (
    <div
      className={`space-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] lg:space-y-8 ${
        ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <SettingsHeader />

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

      <SettingsAi
        ai={data.ai}
        onChange={(ai) => updateData((d) => ({ ...d, ai }))}
      />

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

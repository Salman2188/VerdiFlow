import { Sparkles } from "lucide-react";

import { AiSection } from "@/components/dashboard/ai-assistant/AiSection";

import { SettingsSelect, SettingsToggle } from "./SettingsControls";
import type { AiSettings } from "./types";

type SettingsAiProps = {
  ai: AiSettings;
  onChange: (ai: AiSettings) => void;
};

export function SettingsAi({ ai, onChange }: SettingsAiProps) {
  const update = <K extends keyof AiSettings>(field: K, value: AiSettings[K]) => {
    onChange({ ...ai, [field]: value });
  };

  return (
    <AiSection
      title="AI-innstillinger"
      subtitle="Tilpass hvordan AI jobber for deg"
      icon={<Sparkles className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <SettingsSelect
            label="AI-aggresivitet"
            value={ai.aggressiveness}
            onChange={(v) => update("aggressiveness", v as AiSettings["aggressiveness"])}
            options={[
              { value: "lav", label: "Lav — konservativ oppfølging" },
              { value: "moderat", label: "Moderat — balansert" },
              { value: "høy", label: "Høy — proaktiv og rask" },
            ]}
          />
          <SettingsSelect
            label="AI-tone"
            value={ai.tone}
            onChange={(v) => update("tone", v as AiSettings["tone"])}
            options={[
              { value: "profesjonell", label: "Profesjonell" },
              { value: "vennlig", label: "Vennlig" },
              { value: "direkte", label: "Direkte" },
            ]}
          />

          <div className="rounded-xl border border-white/[0.04] bg-black/15 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-white">Konfidensterskel</p>
                <p className="mt-0.5 text-[11px] text-zinc-600">
                  Minimum AI-sikkerhet for automatiske handlinger
                </p>
              </div>
              <span className="text-[14px] font-bold tabular-nums text-emerald-400">
                {ai.confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={95}
              value={ai.confidenceThreshold}
              onChange={(event) => update("confidenceThreshold", Number(event.target.value))}
              className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <SettingsToggle
            label="Automatiske oppfølginger"
            description="AI sender oppfølging basert på lead-aktivitet"
            checked={ai.automaticFollowups}
            onChange={(v) => update("automaticFollowups", v)}
          />
          <SettingsToggle
            label="Automatiske påminnelser"
            description="Påminnelser for visninger og oppgaver"
            checked={ai.automaticReminders}
            onChange={(v) => update("automaticReminders", v)}
          />
          <SettingsToggle
            label="Daglig briefing"
            description="AI-oppsummering hver morgen"
            checked={ai.dailyBriefing}
            onChange={(v) => update("dailyBriefing", v)}
          />
          <SettingsToggle
            label="Ukesrapport"
            description="Automatisk rapport hver mandag"
            checked={ai.weeklyReport}
            onChange={(v) => update("weeklyReport", v)}
          />
        </div>
      </div>
    </AiSection>
  );
}

import {
  dashboardFocusRing,
  dashboardInput,
  dashboardSelect,
  dashboardToggleRow,
} from "@/components/dashboard/dashboard-styles";

type SettingsInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
};

export function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: SettingsInputProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-zinc-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 ${dashboardInput}`}
      />
    </label>
  );
}

type SettingsSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SettingsSelect({ label, value, onChange, options }: SettingsSelectProps) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-zinc-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-1.5 ${dashboardSelect} h-10 w-full px-3.5 text-sm text-zinc-200`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-zinc-950">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type SettingsToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function SettingsToggle({ label, description, checked, onChange }: SettingsToggleProps) {
  return (
    <div className={dashboardToggleRow}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-50">{label}</p>
        {description && <p className="mt-0.5 text-xs text-zinc-600">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
          checked ? "bg-emerald-500/80" : "bg-zinc-800"
        } ${dashboardFocusRing}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

type SettingsSaveButtonProps = {
  onClick?: () => void;
  label?: string;
};

export function SettingsSaveButton({ onClick, label = "Lagre" }: SettingsSaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-6 text-sm font-semibold text-emerald-300 transition-colors duration-150 hover:border-emerald-500/35 hover:bg-emerald-500/15 ${dashboardFocusRing}`}
    >
      {label}
    </button>
  );
}

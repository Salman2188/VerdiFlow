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
        className="mt-1.5 h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 text-[13px] text-zinc-200 placeholder:text-zinc-600 transition-all duration-300 focus:border-emerald-500/25 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-emerald-500/15"
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
        className="mt-1.5 h-10 w-full cursor-pointer appearance-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 text-[13px] text-zinc-200 transition-all duration-300 focus:border-emerald-500/25 focus:outline-none focus:ring-1 focus:ring-emerald-500/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#0a0e0c]">
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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] bg-black/15 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-white">{label}</p>
        {description && (
          <p className="mt-0.5 text-[11px] text-zinc-600">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 ${
          checked ? "bg-emerald-500/80" : "bg-white/[0.08]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
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
      className="inline-flex h-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.1] px-6 text-[13px] font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-500/[0.15]"
    >
      {label}
    </button>
  );
}

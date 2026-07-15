import { Mail, Phone } from "lucide-react";

type LeadContactInfoProps = {
  email: string;
  phone: string;
  layout?: "inline" | "stacked";
};

export function LeadContactInfo({
  email,
  phone,
  layout = "stacked",
}: LeadContactInfoProps) {
  if (layout === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-600">
        <span className="flex items-center gap-1">
          <Phone className="h-3 w-3 shrink-0" strokeWidth={1.75} />
          {phone}
        </span>
        <span className="flex items-center gap-1">
          <Mail className="h-3 w-3 shrink-0" strokeWidth={1.75} />
          {email}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-[11px] text-zinc-600">
        <Phone className="h-3 w-3 shrink-0" strokeWidth={1.75} />
        {phone}
      </p>
      <p className="flex items-center gap-1.5 truncate text-[11px] text-zinc-600">
        <Mail className="h-3 w-3 shrink-0" strokeWidth={1.75} />
        {email}
      </p>
    </div>
  );
}

import { Home } from "lucide-react";

import { DetailSection } from "./DetailSection";
import type { LeadPropertyDetail } from "./types";

type LeadDetailPropertyProps = {
  property: LeadPropertyDetail;
};

export function LeadDetailProperty({ property }: LeadDetailPropertyProps) {
  const fields = [
    { label: "Adresse", value: property.address },
    { label: "Type", value: property.type },
    { label: "Størrelse", value: property.size },
    { label: "Rom", value: property.rooms },
    { label: "Byggeår", value: property.yearBuilt },
    { label: "Prisantydning", value: property.askingPrice },
    { label: "Kundens budsjett", value: property.budget },
    { label: "Kommune", value: property.municipality },
    ...(property.viewingDate
      ? [{ label: "Siste visning", value: property.viewingDate }]
      : []),
  ];

  return (
    <DetailSection
      title="Eiendomsinformasjon"
      subtitle="Objekt og pris"
      icon={<Home className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <dl className="grid gap-3 text-[12px]">
        {fields.map((field, index) => (
          <div
            key={field.label}
            className={`flex justify-between gap-4 ${
              index < fields.length - 1 ? "border-b border-white/[0.03] pb-3" : ""
            }`}
          >
            <dt className="shrink-0 text-zinc-600">{field.label}</dt>
            <dd className="text-right font-medium text-zinc-300">{field.value}</dd>
          </div>
        ))}
      </dl>
    </DetailSection>
  );
}

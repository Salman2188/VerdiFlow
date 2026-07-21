import { User } from "lucide-react";

import { dashboardBadge } from "@/components/dashboard/dashboard-styles";
import { LeadContactInfo } from "@/components/dashboard/leads/LeadContactInfo";

import { DetailSection } from "./DetailSection";
import type { LeadCustomerProfile } from "./types";

type LeadDetailProfileProps = {
  profile: LeadCustomerProfile;
};

export function LeadDetailProfile({ profile }: LeadDetailProfileProps) {
  return (
    <DetailSection
      title="Kundeprofil"
      subtitle="Kontakt og bakgrunn"
      icon={<User className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={1.75} />}
    >
      <div className="space-y-4">
        <LeadContactInfo email={profile.email} phone={profile.phone} />

        <dl className="grid gap-3 text-xs">
          {[
            { label: "Kilde", value: profile.source },
            { label: "Kundetype", value: profile.buyerType },
            { label: "Finansiering", value: profile.financing },
            { label: "Foretrukket kontakt", value: profile.preferredContact },
            { label: "Kunde siden", value: profile.createdAt },
          ].map((field, index, fields) => (
            <div
              key={field.label}
              className={`flex justify-between gap-4 ${
                index < fields.length - 1 ? "border-b border-zinc-800/60 pb-3" : ""
              }`}
            >
              <dt className="text-zinc-600">{field.label}</dt>
              <dd className="text-right font-medium text-zinc-300">{field.value}</dd>
            </div>
          ))}
        </dl>

        {profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.tags.map((tag) => (
              <span key={tag} className={dashboardBadge}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </DetailSection>
  );
}

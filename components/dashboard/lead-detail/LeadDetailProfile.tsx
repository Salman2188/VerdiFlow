import { User } from "lucide-react";

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

        <dl className="grid gap-3 text-[12px]">
          <div className="flex justify-between gap-4 border-b border-white/[0.03] pb-3">
            <dt className="text-zinc-600">Kilde</dt>
            <dd className="font-medium text-zinc-300">{profile.source}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/[0.03] pb-3">
            <dt className="text-zinc-600">Kundetype</dt>
            <dd className="font-medium text-zinc-300">{profile.buyerType}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/[0.03] pb-3">
            <dt className="text-zinc-600">Finansiering</dt>
            <dd className="font-medium text-zinc-300">{profile.financing}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/[0.03] pb-3">
            <dt className="text-zinc-600">Foretrukket kontakt</dt>
            <dd className="font-medium text-zinc-300">{profile.preferredContact}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-600">Kunde siden</dt>
            <dd className="font-medium text-zinc-300">{profile.createdAt}</dd>
          </div>
        </dl>

        {profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </DetailSection>
  );
}

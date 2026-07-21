import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import {
  dashboardFocusRing,
  dashboardInteractiveCard,
  dashboardPanel,
  dashboardPanelPadding,
  dashboardSectionDescription,
} from "@/components/dashboard/dashboard-styles";

import { DEFAULT_HERO_CONTENT } from "./hero-content";
import type { DashboardHeroContent } from "./types";

type DashboardHeroProps = {
  content?: DashboardHeroContent;
};

export function DashboardHero({ content = DEFAULT_HERO_CONTENT }: DashboardHeroProps) {
  return (
    <section aria-labelledby="dashboard-heading">
      <h1
        id="dashboard-heading"
        className="text-xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-2xl"
      >
        {content.greeting}, {content.agentName}
      </h1>
      <p className={`mt-2 ${dashboardSectionDescription}`}>{content.aiSummary}</p>

      <div className={`mt-6 ${dashboardPanel} ${dashboardPanelPadding}`}>
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3 lg:border-r lg:border-zinc-800 lg:pr-8">
            <DashboardSectionHeader
              variant="nested"
              title="Dagens fokus"
              description="Prioritert av AI basert på sannsynlighet og timing"
            />
            <ol className="space-y-2">
              {content.focusTasks.map((task) => (
                <li key={task.id}>
                  <Link
                    href={task.href}
                    className={`group flex gap-3 px-3 py-3 ${dashboardInteractiveCard} ${dashboardFocusRing}`}
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-xs font-medium tabular-nums text-zinc-300"
                      aria-hidden="true"
                    >
                      {task.priority}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-100 group-hover:text-zinc-50">
                        {task.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{task.context}</p>
                      <p className="mt-1 text-[10px] font-medium text-emerald-400/70">
                        {task.value}
                      </p>
                    </div>
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-zinc-400"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <DashboardSectionHeader
              variant="nested"
              title="AI-briefing"
              description="Siste 24 timer"
            />
            <ul className="space-y-2">
              {content.briefInsights.map((insight) => (
                <li key={insight.id} className="text-sm leading-6 text-zinc-400">
                  {insight.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

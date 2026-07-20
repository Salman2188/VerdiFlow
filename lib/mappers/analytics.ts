import type { AnalyticsData } from "@/components/dashboard/analytics";
import type { AiInsight } from "@/components/dashboard/insights";
import type { KpiMetric } from "@/components/dashboard/kpi";
import type { PipelineStage } from "@/components/dashboard/pipeline";
import type { LeadRow, ProfileRow } from "@/types/database";
import { formatCurrency, formatMillions, parseBudgetMillions } from "@/lib/mappers/lead";
import { formatRelativeTime } from "@/lib/utils/relative-time";

const CHART_LABELS = [
  "1. mar",
  "5. mar",
  "9. mar",
  "13. mar",
  "17. mar",
  "21. mar",
  "25. mar",
  "29. mar",
];

const SOURCE_COLORS: Record<string, string> = {
  "Finn.no": "bg-emerald-400",
  "Sosiale medier": "bg-violet-400",
  Referanse: "bg-sky-400",
  Hjemmeside: "bg-amber-400",
  Zett: "bg-zinc-500",
  Meglertjeneste: "bg-zinc-500",
};

const STAGE_META: Record<
  LeadRow["stage"],
  { label: string; emoji: string }
> = {
  hot: { label: "Varme", emoji: "🔥" },
  warm: { label: "Varm", emoji: "🟠" },
  active: { label: "Aktive", emoji: "🟢" },
  new: { label: "Nye", emoji: "⚪" },
};

function buildSparkline(value: number, points = 7): number[] {
  const start = Math.max(value * 0.65, 1);
  const step = (value - start) / (points - 1);
  return Array.from({ length: points }, (_, index) =>
    Number((start + step * index).toFixed(1)),
  );
}

function positiveTrend(value: string): { value: string; positive: boolean } {
  return { value, positive: true };
}

export function buildDashboardKpis(leads: LeadRow[]): KpiMetric[] {
  const total = leads.length;
  const hotLeads = leads.filter((lead) => lead.stage === "hot").length;
  const pipelineValue = leads.reduce(
    (sum, lead) => sum + parseBudgetMillions(lead.budget),
    0,
  );
  const showings = leads.filter((lead) => lead.status.toLowerCase().includes("visning")).length;
  const sold = leads.filter((lead) => lead.pipeline_stage_id === "solgt").length;
  const conversionRate = total > 0 ? Math.round((sold / total) * 100) : 0;
  const averageAiScore =
    total > 0
      ? Math.round(leads.reduce((sum, lead) => sum + lead.ai_priority_score, 0) / total)
      : 0;

  return [
    {
      id: "active-leads",
      label: "Aktive leads",
      value: total,
      trend: positiveTrend(`+${Math.max(1, Math.round(total * 0.08))}%`),
      sparkline: buildSparkline(total),
      icon: "users",
    },
    {
      id: "pipeline-value",
      label: "Pipeline-verdi",
      value: Number(pipelineValue.toFixed(1)),
      suffix: "M kr",
      decimals: 1,
      trend: positiveTrend("+18%"),
      sparkline: buildSparkline(pipelineValue),
      icon: "trending-up",
    },
    {
      id: "hot-leads",
      label: "Hot leads",
      value: hotLeads,
      trend: positiveTrend(`+${Math.max(1, hotLeads)}`),
      sparkline: buildSparkline(hotLeads),
      icon: "flame",
    },
    {
      id: "ai-time-saved",
      label: "Tid spart av AI",
      value: Math.max(6, Math.round(averageAiScore / 7)),
      suffix: "t",
      trend: positiveTrend(`+${Math.max(1, Math.round(averageAiScore / 20))}t`),
      sparkline: buildSparkline(Math.max(6, Math.round(averageAiScore / 7))),
      icon: "clock",
    },
    {
      id: "showings",
      label: "Visninger denne uken",
      value: showings,
      trend: positiveTrend(`+${Math.max(1, showings - 1)}`),
      sparkline: buildSparkline(showings),
      icon: "calendar",
    },
    {
      id: "conversion-rate",
      label: "Konverteringsrate",
      value: conversionRate || 31,
      suffix: "%",
      trend: positiveTrend("+5%"),
      sparkline: buildSparkline(conversionRate || 31),
      icon: "percent",
    },
  ];
}

export function buildDashboardPipelinePreview(leads: LeadRow[]): PipelineStage[] {
  const stageOrder: LeadRow["stage"][] = ["hot", "warm", "active", "new"];

  return stageOrder.map((stageId) => ({
    id: stageId,
    label: STAGE_META[stageId].label,
    emoji: STAGE_META[stageId].emoji,
    leads: leads
      .filter((lead) => lead.stage === stageId)
      .sort((a, b) => b.ai_priority_score - a.ai_priority_score)
      .slice(0, 4)
      .map((lead) => ({
        id: lead.id,
        customerName: lead.customer_name,
        property: lead.property ?? "",
        status: lead.status,
        lastActivity: formatRelativeTime(lead.last_activity_at),
        aiRecommendation: lead.ai_recommendation,
        closingProbability: lead.closing_probability,
        priority: lead.priority,
      })),
  }));
}

export function buildDashboardInsights(leads: LeadRow[]): AiInsight[] {
  const sorted = [...leads].sort((a, b) => b.ai_priority_score - a.ai_priority_score);
  const top = sorted[0];
  const second = sorted[1];
  const inactive = [...leads]
    .sort((a, b) => new Date(a.last_activity_at).getTime() - new Date(b.last_activity_at).getTime())[0];
  const pipelineValue = leads.reduce(
    (sum, lead) => sum + parseBudgetMillions(lead.budget),
    0,
  );

  const insights: AiInsight[] = [];

  if (top) {
    insights.push({
      id: "insight-top",
      title: "Høyeste prioritetsmulighet",
      explanation: `${top.customer_name} har ${top.closing_probability} % lukkingssannsynlighet og trenger oppfølging nå.`,
      action: top.ai_recommendation,
      confidence: top.ai_confidence ?? top.ai_priority_score,
      priority: top.priority,
    });
  }

  if (second) {
    insights.push({
      id: "insight-next",
      title: "Neste lead å kontakte",
      explanation: `${second.customer_name} er i ${second.status.toLowerCase()} og har AI-score ${second.ai_priority_score}.`,
      action: second.ai_recommendation,
      confidence: second.ai_confidence ?? second.ai_priority_score,
      priority: second.priority,
    });
  }

  if (inactive) {
    insights.push({
      id: "insight-inactive",
      title: "Lead mister engasjement",
      explanation: `${inactive.customer_name} har ikke hatt aktivitet på ${inactive.status.toLowerCase()} på en stund.`,
      action: inactive.ai_recommendation,
      confidence: inactive.ai_confidence ?? inactive.ai_priority_score,
      priority: inactive.priority,
    });
  }

  insights.push({
    id: "insight-revenue",
    title: "Estimert månedlig omsetning",
    explanation: `Basert på pipeline-verdi og konverteringsrate anslår AI ${formatMillions(pipelineValue * 0.13, 1)} i lukket volum.`,
    action: `Fokuser på ${leads.filter((lead) => lead.stage === "hot").length} hot leads for å nå prognosen med margin.`,
    confidence: 76,
  });

  insights.push({
    id: "insight-automation",
    title: "Tid spart gjennom automatisering",
    explanation: `AI genererte ${Math.max(leads.length * 2, 12)} oppfølginger denne uken — tilsvarende ${Math.max(6, Math.round(leads.length * 1.2))} timer spart.`,
    action: `Gjennomgå ${Math.max(2, Math.round(leads.length / 3))} AI-utkast som venter på godkjenning i dag.`,
    confidence: 94,
    priority: "Medium",
  });

  return insights.slice(0, 5);
}

export function buildAnalyticsData(
  leads: LeadRow[],
  profiles: ProfileRow[],
  activityCount: number,
): AnalyticsData {
  const total = leads.length;
  const pipelineValue = leads.reduce(
    (sum, lead) => sum + parseBudgetMillions(lead.budget),
    0,
  );
  const sold = leads.filter((lead) => lead.pipeline_stage_id === "solgt").length;
  const conversionRate = total > 0 ? Math.round((sold / total) * 100) || 34 : 34;
  const averageAiScore =
    total > 0
      ? Math.round(leads.reduce((sum, lead) => sum + lead.ai_priority_score, 0) / total)
      : 0;

  const sourceMap = new Map<string, number>();
  for (const lead of leads) {
    sourceMap.set(lead.source, (sourceMap.get(lead.source) ?? 0) + 1);
  }

  const leadSources = [...sourceMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count], index) => ({
      id: `source-${index + 1}`,
      label,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      count,
      color: SOURCE_COLORS[label] ?? "bg-zinc-500",
    }));

  const hotCount = leads.filter((lead) => lead.stage === "hot").length;
  const inactiveCount = leads.filter((lead) => {
    const days = Math.floor(
      (Date.now() - new Date(lead.last_activity_at).getTime()) / 86_400_000,
    );
    return days >= 7;
  }).length;

  return {
    topKpis: [
      {
        id: "pipeline-value",
        label: "Pipeline-verdi",
        value: Number(pipelineValue.toFixed(1)),
        suffix: "M kr",
        decimals: 1,
        trend: positiveTrend("+18%"),
        sparkline: buildSparkline(pipelineValue),
        icon: "trending-up",
      },
      {
        id: "conversion-rate",
        label: "Konverteringsrate",
        value: conversionRate,
        suffix: "%",
        trend: positiveTrend("+5%"),
        sparkline: buildSparkline(conversionRate),
        icon: "percent",
      },
      {
        id: "monthly-revenue",
        label: "Omsetning denne måneden",
        value: Number((pipelineValue * 0.13).toFixed(1)),
        suffix: "M kr",
        decimals: 1,
        trend: positiveTrend("+12%"),
        sparkline: buildSparkline(pipelineValue * 0.13),
        icon: "banknote",
      },
      {
        id: "ai-time-saved",
        label: "Tid spart av AI",
        value: Math.max(8, Math.round(averageAiScore / 5)),
        suffix: "t",
        trend: positiveTrend(`+${Math.max(2, Math.round(averageAiScore / 20))}t`),
        sparkline: buildSparkline(Math.max(8, Math.round(averageAiScore / 5))),
        icon: "clock",
      },
    ],
    salesChart: {
      labels: CHART_LABELS,
      series: [
        {
          id: "pipeline",
          label: "Pipeline-vekst",
          color: "rgba(52,211,153,0.85)",
          data: buildSparkline(pipelineValue, 8).map((value) => Math.round(value)),
        },
        {
          id: "deals",
          label: "Lukkede avtaler",
          color: "rgba(96,165,250,0.75)",
          data: buildSparkline(Math.max(sold, 2), 8).map((value) => Math.round(value)),
        },
        {
          id: "leads",
          label: "Nye leads",
          color: "rgba(251,191,36,0.7)",
          data: buildSparkline(total, 8).map((value) => Math.round(value)),
        },
      ],
    },
    leadSources,
    aiPerformance: [
      {
        id: "followups",
        label: "Oppfølginger generert",
        value: String(Math.max(activityCount, total * 3)),
        trend: positiveTrend("+28%"),
        icon: "message-square",
      },
      {
        id: "time-saved",
        label: "Tid spart",
        value: `${Math.max(8, Math.round(averageAiScore / 5))}t`,
        trend: positiveTrend(`+${Math.max(2, Math.round(averageAiScore / 20))}t`),
        icon: "clock",
      },
      {
        id: "drafts-approved",
        label: "AI-utkast godkjent",
        value: `${Math.min(95, Math.max(70, averageAiScore - 5))}%`,
        trend: positiveTrend("+6%"),
        icon: "file-check",
      },
      {
        id: "automations",
        label: "Automatiseringer kjørt",
        value: String(Math.max(activityCount * 2, total * 8)),
        trend: positiveTrend("+22%"),
        icon: "zap",
      },
      {
        id: "response-time",
        label: "Gjennomsnittlig svartid",
        value: "12 min",
        trend: { value: "-34%", positive: true },
        icon: "timer",
      },
    ],
    agentLeaderboard: profiles
      .sort((a, b) => b.closed_deals - a.closed_deals)
      .map((profile) => ({
        id: profile.id,
        name: profile.full_name,
        closedDeals: profile.closed_deals,
        pipelineValue: formatCurrency(profile.pipeline_value / 1_000_000),
        conversionRate: Number(profile.conversion_rate),
        aiScore: profile.ai_score,
        isTopPerformer: profile.is_top_performer,
      })),
    weeklyInsights: [
      {
        id: "insight-source",
        title: `${leadSources[0]?.label ?? "Finn.no"} gir nå ${leadSources[0]?.percentage ?? 0}% av leads.`,
        recommendation: "Øk budsjett for beste konverteringskanal neste uke.",
        confidence: 91,
        icon: "share-2",
      },
      {
        id: "insight-response",
        title: "Responstid falt med 34%.",
        recommendation: "Behold AI-automatisering for første kontakt på nye leads.",
        confidence: 94,
        icon: "timer",
      },
      {
        id: "insight-pipeline",
        title: `Pipeline økte med ${Math.max(8, Math.round(pipelineValue / 4))}%.`,
        recommendation: `Fokuser på forhandlingsfasen — ${hotCount} leads nær lukking.`,
        confidence: 87,
        icon: "trending-up",
      },
      {
        id: "insight-ai",
        title: `AI sparte totalt ${Math.max(8, Math.round(averageAiScore / 5))} timer denne uken.`,
        recommendation: `Gjennomgå ${Math.max(2, Math.round(total / 2))} ventende AI-utkast for raskere oppfølging.`,
        confidence: 96,
        icon: "bot",
      },
    ],
    forecast: {
      expectedPipeline: formatMillions(pipelineValue * 1.2, 1),
      expectedClosedDeals: Math.max(hotCount, 1),
      expectedRevenue: formatMillions(pipelineValue * 0.16, 1),
      confidence: 82,
      recommendedActions: [
        `Prioriter ${hotCount} hot leads i forhandlingsfasen for å nå omsetningsmål`,
        `Øk oppfølging på ${leadSources[0]?.label ?? "Finn.no"}-leads — høyest volum i porteføljen`,
        "Book 2 ekstra visninger i premium-segmentet (9,5M+)",
        `Aktiver reaktiveringskampanje for ${inactiveCount} inaktive leads`,
      ],
    },
  };
}

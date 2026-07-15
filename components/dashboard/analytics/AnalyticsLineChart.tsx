type AnalyticsLineChartProps = {
  labels: string[];
  series: {
    id: string;
    label: string;
    color: string;
    data: number[];
  }[];
};

export function AnalyticsLineChart({ labels, series }: AnalyticsLineChartProps) {
  const width = 560;
  const height = 200;
  const padding = { top: 16, right: 16, bottom: 28, left: 16 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = series.flatMap((s) => s.data);
  const max = Math.max(...allValues);
  const min = 0;
  const range = max - min || 1;

  const toPoint = (value: number, index: number, total: number) => {
    const x = padding.left + (index / (total - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - min) / range) * chartHeight;
    return `${x},${y}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[320px]"
        aria-label="Salgsutvikling siste 30 dager"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = padding.top + chartHeight * (1 - fraction);
          return (
            <line
              key={fraction}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          );
        })}

        {series.map((s) => {
          const points = s.data
            .map((v, i) => toPoint(v, i, s.data.length))
            .join(" ");

          return (
            <g key={s.id}>
              <polyline
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.data.map((v, i) => {
                const [x, y] = toPoint(v, i, s.data.length).split(",").map(Number);
                return (
                  <circle
                    key={`${s.id}-${i}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={s.color}
                    className="opacity-80"
                  />
                );
              })}
            </g>
          );
        })}

        {labels.map((label, i) => {
          const x = padding.left + (i / (labels.length - 1)) * chartWidth;
          return (
            <text
              key={label}
              x={x}
              y={height - 6}
              textAnchor="middle"
              className="fill-zinc-600 text-[9px]"
            >
              {label}
            </text>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-4">
        {series.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[11px] text-zinc-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

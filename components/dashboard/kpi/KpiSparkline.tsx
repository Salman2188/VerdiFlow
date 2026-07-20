type KpiSparklineProps = {
  data: number[];
  id: string;
  positive?: boolean;
};

export function KpiSparkline({ data, id, positive = true }: KpiSparklineProps) {
  const width = 80;
  const height = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - 3 - ((v - min) / range) * (height - 6);
      return `${x},${y}`;
    })
    .join(" ");

  const gradientId = `spark-${id}`;
  const strokeStart = positive ? "rgba(52,211,153,0.25)" : "rgba(251,113,133,0.25)";
  const strokeEnd = positive ? "rgba(52,211,153,0.9)" : "rgba(251,113,133,0.9)";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-8 w-20 shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={strokeStart} />
          <stop offset="100%" stopColor={strokeEnd} />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type KpiSparklineProps = {
  data: number[];
  id: string;
};

export function KpiSparkline({ data, id }: KpiSparklineProps) {
  const width = 72;
  const height = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - 2 - ((v - min) / range) * (height - 4);
      return `${x},${y}`;
    })
    .join(" ");

  const gradientId = `spark-${id}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-[4.5rem] shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
          <stop offset="100%" stopColor="rgba(52,211,153,0.85)" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

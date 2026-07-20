type MetricValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function MetricValue({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: MetricValueProps) {
  const formatted =
    decimals > 0
      ? value.toFixed(decimals).replace(".", ",")
      : Math.round(value).toString();

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

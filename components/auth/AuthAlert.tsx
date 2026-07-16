type AuthAlertProps = {
  tone?: "error" | "success";
  message: string;
};

export function AuthAlert({ tone = "error", message }: AuthAlertProps) {
  const styles =
    tone === "error"
      ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
      : "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`} role="alert">
      {message}
    </div>
  );
}

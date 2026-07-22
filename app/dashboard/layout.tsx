export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-zinc-950 font-sans text-zinc-50 antialiased">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

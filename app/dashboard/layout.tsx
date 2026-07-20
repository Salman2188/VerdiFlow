export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 antialiased">{children}</div>
  );
}

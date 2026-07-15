export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#070b0a] text-zinc-50 antialiased">
      {children}
    </div>
  );
}

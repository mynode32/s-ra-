// The Sıra landing page ships its own bold nav + footer, so this layout is a
// pass-through. Keep it here so the (marketing) route group has a layout.
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

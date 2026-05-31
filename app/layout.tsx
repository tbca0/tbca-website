import type { Metadata } from "next";
import "./globals.css";
import "./tbca.css";

export const metadata: Metadata = {
  title: "TBCA — Telangana Bengali Cultural Association",
  description:
    "Telangana Bengali Cultural Association (TBCA) — promoting Bengali language, festivals, and community in Telangana. Connecting people through culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

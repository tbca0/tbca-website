import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import "./tbca.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

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
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

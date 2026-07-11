import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://divinegabriel.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ugokanu Divine Gabriel — Founder, Trader, Builder",
  description:
    "Nigerian founder building LinkUpNaija, Aerovigil and EcoFlux Energy. Trader. Builder. Based in Abuja, Nigeria.",
  openGraph: {
    title: "Ugokanu Divine Gabriel — Founder, Trader, Builder",
    description:
      "Nigerian founder building LinkUpNaija, Aerovigil and EcoFlux Energy. Trader. Builder. Based in Abuja, Nigeria.",
    url: siteUrl,
    siteName: "Ugokanu Divine Gabriel",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugokanu Divine Gabriel — Founder, Trader, Builder",
    description:
      "Nigerian founder building LinkUpNaija, Aerovigil and EcoFlux Energy. Trader. Builder. Based in Abuja, Nigeria.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

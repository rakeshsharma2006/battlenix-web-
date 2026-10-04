import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BattleNix",
    template: "%s | BattleNix",
  },
  description:
    "BattleNix helps BGMI and Free Fire players discover tournaments, team up, and track results through a mobile-first esports platform.",
  keywords: [
    "BattleNix",
    "BGMI tournaments",
    "Free Fire tournaments",
    "esports India",
    "team-based gaming",
  ],
  openGraph: {
    title: "BattleNix",
    description:
      "BattleNix helps BGMI and Free Fire players discover tournaments, team up, and track results through a mobile-first esports platform.",
    type: "website",
    siteName: "BattleNix",
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BattleNix esports platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BattleNix",
    description:
      "BattleNix helps BGMI and Free Fire players discover tournaments, team up, and track results through a mobile-first esports platform.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="min-h-screen text-zinc-50 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white/10 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

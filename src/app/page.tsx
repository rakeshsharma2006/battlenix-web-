import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TournamentSection } from "@/components/sections/TournamentSection";
import { StatsCard } from "@/components/ui/StatsCard";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";
import { RevealGroup } from "@/components/motion/RevealGroup";

export const metadata = createPageMetadata({
  title: "BattleNix — Competitive Esports Tournaments",
  description: "BattleNix is a mobile platform for BGMI and Free Fire tournaments, team participation, match results, and tournament progress.",
  path: "/",
});

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BattleNix",
    url: SITE_URL,
    sameAs: [],
    description:
      "BattleNix helps BGMI and Free Fire players discover tournaments, compete in teams, and track results.",
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BattleNix",
    url: "https://battlenix.in",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Hero />
      <section aria-label="Platform highlights" className="border-y border-[#26262c]">
        <RevealGroup className="mx-auto grid w-full max-w-7xl px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {["Competitive Tournaments", "Real-Time Results", "Team-Based Events", "Secure Payment Flow"].map((label) => <StatsCard key={label} label={label} />)}
        </RevealGroup>
      </section>
      <HowItWorks />
      <FeaturesSection />
      <TournamentSection />
      <DownloadCTA />
    </>
  );
}

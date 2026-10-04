import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TournamentSection } from "@/components/sections/TournamentSection";
import { StatsCard } from "@/components/ui/StatsCard";
import { Container } from "@/components/ui/Container";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";

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
        <Container className="grid sm:grid-cols-2 lg:grid-cols-4">
          {["Competitive Tournaments", "Real-Time Results", "Team-Based Events", "Secure Payment Flow"].map((label) => <StatsCard key={label} label={label} />)}
        </Container>
      </section>
      <HowItWorks />
      <FeaturesSection />
      <TournamentSection />
      <DownloadCTA />
    </>
  );
}

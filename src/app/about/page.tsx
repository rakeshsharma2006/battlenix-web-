import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PLAY_STORE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import { RevealGroup } from "@/components/motion/RevealGroup";

export const metadata = createPageMetadata({
  title: "BattleNix About",
  description: "Learn about BattleNix, a mobile platform for structured BGMI and Free Fire tournaments, teams, matches, standings, and player experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-4xl">
          <PageHeader eyebrow="About BattleNix" title="Competitive play, structured for teams." description="BattleNix is a mobile platform for structured tournaments, team competition, matches, and standings for BGMI and Free Fire." />

          <RevealGroup className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {[
              ["What We Build", "Tournament experiences that organize event details, registration, matches, and outcomes."],
              ["Tournament Experience", "Players can review event information and follow tournament progress in the app."],
              ["Team Competition", "Team features support creating or joining squads and taking part in team events."],
              ["Fair Play", "BattleNix publishes a Fair Play Policy covering conduct and event participation."],
              ["Player Experience", "The app brings tournament-related details and player activity into one place."],
            ].map(([heading, copy]) => (
              <section key={heading} className="border-t border-[#26262c] py-5">
                <h2 className="font-display text-xl font-semibold text-white">{heading}</h2>
                <p className="mt-2 text-sm leading-7 text-[#a1a1aa]">{copy}</p>
              </section>
            ))}
          </RevealGroup>

          <div className="mt-4 flex flex-wrap gap-5 text-sm">
            <Link href="/how-it-works" className="min-h-11 text-white underline decoration-[#e5484d] underline-offset-4">
              How it works
            </Link>
            <Link href="/fair-play" className="min-h-11 text-white underline decoration-[#e5484d] underline-offset-4">
              Fair Play
            </Link>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 text-white underline decoration-[#e5484d] underline-offset-4">
              Google Play
            </a>
          </div>

          <p className="mt-8 border-t border-[#26262c] pt-5 text-sm leading-7 text-[#a1a1aa]">
            BattleNix is not affiliated with or endorsed by Krafton or Garena. BGMI and Free Fire belong to their owners.
          </p>
        </div>
      </Container>
    </section>
  );
}

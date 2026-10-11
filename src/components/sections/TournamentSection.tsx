import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TournamentCard } from "@/components/ui/TournamentCard";
import { fetchPublicTournaments } from "@/lib/api";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Atmosphere } from "@/components/motion/Atmosphere";

export async function TournamentSection() {
  const { tournaments } = await fetchPublicTournaments({ limit: 3 });
  const displayTournaments = tournaments.slice(0, 3);

  if (displayTournaments.length === 0) {
    return null;
  }

  return (
    <section className="relative isolate overflow-clip py-16 sm:py-20" aria-labelledby="tournaments-heading">
      <Atmosphere variant="section" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Live Arena"
            title="Featured Tournaments"
            description="Compete in real-time BGMI and Free Fire esports tournaments. Join with your squad and play for rewards."
          />
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live tournaments open now
          </div>
        </Reveal>
        <RevealGroup className="mt-6 grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </RevealGroup>

        <Reveal delay={100} className="mt-8 flex justify-center">
          <Button href="/tournaments" variant="outline">
            View All Tournaments
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

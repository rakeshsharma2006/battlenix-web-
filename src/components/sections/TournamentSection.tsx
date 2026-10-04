import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TournamentCard } from "@/components/ui/TournamentCard";
import { getTournaments } from "@/lib/demo-tournaments";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Atmosphere } from "@/components/motion/Atmosphere";

export function TournamentSection() {
  const tournaments = getTournaments().slice(0, 3);

  return (
    <section className="relative isolate overflow-clip py-16 sm:py-20" aria-labelledby="tournaments-heading">
      <Atmosphere variant="section" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Featured tournaments"
            title="Tournament previews"
            description="Sample tournament cards for layout preview. Current event details are shown in the app."
          />
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <p className="inline-flex rounded-md border border-[#45454d] px-2.5 py-1 text-xs font-medium text-[#a1a1aa]">Sample preview</p>
        </Reveal>
        <RevealGroup className="mt-4 grid min-w-0 gap-4 xl:grid-cols-3">
          {tournaments.map((tournament) => <TournamentCard key={tournament.slug} tournament={tournament} />)}
        </RevealGroup>

        <Reveal delay={100} className="mt-6 flex justify-center">
          <Button href="/tournaments" variant="outline">View Tournament List</Button>
        </Reveal>
      </Container>
    </section>
  );
}

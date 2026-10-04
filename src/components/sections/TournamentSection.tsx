import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TournamentCard } from "@/components/ui/TournamentCard";
import { getTournaments } from "@/lib/demo-tournaments";

export function TournamentSection() {
  const tournaments = getTournaments().slice(0, 3);

  return (
    <section className="py-16 sm:py-20" aria-labelledby="tournaments-heading">
      <Container>
        <SectionHeading
          eyebrow="Featured tournaments"
          title="Tournament previews"
          description="Sample tournament cards for layout preview. Current event details are shown in the app."
        />

        <p className="mt-8 inline-flex rounded-md border border-[#45454d] px-2.5 py-1 text-xs font-medium text-[#a1a1aa]">Sample preview</p>
        <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-3">
          {tournaments.map((tournament) => <TournamentCard key={tournament.slug} tournament={tournament} />)}
        </div>

        <div className="mt-6 flex justify-center">
          <Button href="/tournaments" variant="outline">View Tournament List</Button>
        </div>
      </Container>
    </section>
  );
}

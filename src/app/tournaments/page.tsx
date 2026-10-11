import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TournamentListing } from "@/components/tournaments/TournamentListing";
import { createPageMetadata } from "@/lib/metadata";
import { fetchPublicTournaments } from "@/lib/api";

export const metadata = createPageMetadata({
  title: "Live Esports Tournaments",
  description:
    "Discover live BGMI and Free Fire esports tournaments on BattleNix. View format, entry fees, prize pools, and register through the BattleNix app.",
  path: "/tournaments",
});

function TournamentSkeleton() {
  return (
    <div className="mt-8 space-y-8" aria-busy="true" aria-label="Loading tournaments">
      <div className="flex h-16 w-full animate-pulse rounded-lg bg-[#18181b]" />
      <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-96 animate-pulse flex-col rounded-xl border border-[#26262c] bg-[#131316] p-5"
          >
            <div className="h-40 w-full rounded-lg bg-[#202026]" />
            <div className="mt-5 h-6 w-3/4 rounded bg-[#202026]" />
            <div className="mt-3 h-4 w-1/2 rounded bg-[#202026]" />
            <div className="mt-auto h-11 w-full rounded-lg bg-[#202026]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function TournamentsPage() {
  const { tournaments, error } = await fetchPublicTournaments();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <PageHeader
          eyebrow="Esports Arena"
          title="Tournaments"
          description="Explore active and upcoming BGMI and Free Fire tournaments. Review prize pools, format rules, and qualification stages."
        />
        <Suspense fallback={<TournamentSkeleton />}>
          <TournamentListing initialTournaments={tournaments} initialError={error} />
        </Suspense>
      </Container>
    </section>
  );
}

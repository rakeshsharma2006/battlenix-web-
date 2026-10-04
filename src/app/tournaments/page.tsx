import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { TournamentListing } from "@/components/tournaments/TournamentListing";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "BattleNix Tournaments",
  description: "Browse sample BattleNix esports tournament previews and filter them by supported game and event status. Current tournament details remain in the app.",
  path: "/tournaments",
});

export default function TournamentsPage() {
  return (
    <section className="py-12 sm:py-16"><Container>
      <PageHeader eyebrow="Sample data" title="Tournaments" description="Compete in structured esports tournaments and follow your journey from registration to final. The cards below are sample previews, not live events." />
      <Suspense fallback={<div className="mt-8 h-14 border-y border-[#26262c]" />}>
        <TournamentListing />
      </Suspense>
    </Container></section>
  );
}

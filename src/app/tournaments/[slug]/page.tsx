import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getTournaments } from "@/lib/demo-tournaments";
import { createPageMetadata } from "@/lib/metadata";
import { PLAY_STORE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return getTournaments().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/tournaments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tournament = getTournaments().find((item) => item.slug === slug);
  if (!tournament) return createPageMetadata({ title: "Tournament Preview", description: "Sample BattleNix tournament details.", path: `/tournaments/${slug}` });

  return createPageMetadata({
    title: `${tournament.title} Sample Tournament`,
    description: `Sample ${tournament.game} tournament details for ${tournament.title}, including format, schedule, stages, and prize information. This is sample data only.`,
    path: `/tournaments/${tournament.slug}`,
  });
}

export default async function TournamentDetailPage({ params }: PageProps<"/tournaments/[slug]">) {
  const { slug } = await params;
  const tournament = getTournaments().find((item) => item.slug === slug);
  if (!tournament) notFound();

  const date = (value: string) => new Date(value).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" });

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#a1a1aa]">
          <Link href="/" className="hover:text-white">Home</Link><span className="px-2">/</span>
          <Link href="/tournaments" className="hover:text-white">Tournaments</Link><span className="px-2">/</span>
          <span aria-current="page" className="text-white">{tournament.title}</span>
        </nav>
        <div className="mb-8 inline-flex rounded-md border border-[#45454d] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#a1a1aa]">
          Sample tournament preview
        </div>
        <PageHeader eyebrow={tournament.game} title={tournament.title} description={tournament.summary} />

        <div className="mt-8 grid gap-4 border-y border-[#26262c] py-6 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Mode" value={tournament.mode} />
          <Info label="Map" value={tournament.map} />
          <Info label="Prize pool" value={tournament.prizePool} />
          <Info label="Entry fee" value={tournament.entryFee} />
          <Info label="Registered teams" value={`${tournament.registeredTeams} / ${tournament.totalTeams}`} />
          <Info label="Registration deadline" value={date(tournament.registrationDeadline)} />
          <Info label="Schedule" value={date(tournament.date)} />
          <Info label="Status" value={tournament.status} />
        </div>

        <nav aria-label="Tournament sections" className="mt-8 flex flex-wrap gap-2 border-b border-[#26262c] pb-4">
          {["overview", "rules", "stages", "prize"].map((section) => (
            <a key={section} href={`#${section}`} className="min-h-11 rounded-lg border border-[#26262c] px-4 py-2 text-sm capitalize text-[#a1a1aa] hover:border-[#e5484d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]">
              {section}
            </a>
          ))}
        </nav>

        <div className="max-w-3xl">
          <DetailSection id="overview" title="Overview">
            <p>{tournament.summary} This sample page is for preview only; current event information is shown in the app.</p>
          </DetailSection>
          <DetailSection id="rules" title="Rules">
            <ul className="list-disc space-y-2 pl-5">{tournament.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </DetailSection>
          <DetailSection id="stages" title="Stages">
            <ol className="list-decimal space-y-2 pl-5">{tournament.stages.map((stage) => <li key={stage}>{stage}</li>)}</ol>
          </DetailSection>
          <DetailSection id="prize" title="Prize">
            <p>Sample prize pool: {tournament.prizePool}. Refer to the in-app event details for current prize terms and eligibility.</p>
          </DetailSection>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" variant="action">Download App to Register</Button>
          <Button href="/tournaments" variant="outline">All Tournaments</Button>
        </div>
      </Container>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><p className="text-xs text-[#71717a]">{label}</p><p className="mt-1 break-words text-sm font-medium text-white">{value}</p></div>;
}

function DetailSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 border-b border-[#26262c] py-6"><h2 className="font-display text-2xl font-semibold text-white">{title}</h2><div className="mt-3 space-y-3 text-sm leading-7 text-[#a1a1aa]">{children}</div></section>;
}

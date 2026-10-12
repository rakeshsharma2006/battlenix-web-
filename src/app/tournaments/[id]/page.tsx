import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Users,
  Trophy,
  Coins,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Info as InfoIcon,
  Layers,
  ArrowLeft,
  Swords,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fetchPublicTournamentById, fetchPublicTournamentMatches } from "@/lib/api";
import {
  formatCurrencyINR,
  getStatusDisplay,
  getMatchStatusDisplay,
  normalizeGameLabel,
} from "@/lib/tournaments";
import { PLAY_STORE_URL, SITE_URL } from "@/lib/constants";
import { ShareTournamentButton } from "@/components/tournaments/ShareTournamentButton";

type TournamentPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: TournamentPageProps): Promise<Metadata> {
  const { id } = await params;
  const { tournament } = await fetchPublicTournamentById(id);

  if (!tournament) {
    return {
      title: "Tournament Not Found",
      description: "This BattleNix esports tournament is no longer available or does not exist.",
      alternates: { canonical: `${SITE_URL}/tournaments/${id}` },
    };
  }

  const gameLabel = normalizeGameLabel(tournament.game);
  const title = `${tournament.title} | BattleNix`;
  const description =
    tournament.description?.trim() ||
    `Join ${tournament.title}, a competitive ${gameLabel} ${tournament.mode} esports tournament on BattleNix. Prize pool: ${formatCurrencyINR(tournament.prizePool)}.`;

  const canonicalUrl = `${SITE_URL}/tournaments/${tournament.id}`;
  const bannerImage = tournament.banner || `${SITE_URL}/opengraph-image`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BattleNix",
      url: `/tournaments/${tournament.id}`,
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: tournament.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [bannerImage],
    },
  };
}

export default async function TournamentDetailPage({ params }: TournamentPageProps) {
  const { id } = await params;
  const [{ tournament, status }, matches] = await Promise.all([
    fetchPublicTournamentById(id),
    fetchPublicTournamentMatches(id),
  ]);

  if (!tournament) {
    if (status === 404 || status === 400) {
      notFound();
    }

    // In case of unexpected server issue
    return (
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-xl border border-red-500/20 bg-red-950/10 p-8 text-center">
            <h1 className="font-display text-2xl font-bold text-white">
              BattleNix tournaments are temporarily unavailable
            </h1>
            <p className="mt-3 text-sm text-[#a1a1aa]">
              Could not retrieve this tournament right now. Please try again later.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/tournaments"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-5 py-2 text-sm font-semibold text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Tournaments
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const isBgmi = (tournament.game || "").toUpperCase().includes("BGMI");
  const gameLabel = normalizeGameLabel(tournament.game);
  const statusInfo = getStatusDisplay(tournament.status);
  const canonicalUrl = `${SITE_URL}/tournaments/${tournament.id}`;

  const entryFeeDisplay =
    tournament.entryFee === 0 ? "FREE" : formatCurrencyINR(tournament.entryFee);

  const teamProgress =
    tournament.maxTeams > 0
      ? Math.min(100, (tournament.registeredCount / tournament.maxTeams) * 100)
      : 0;

  const formatDate = (isoString: string | null) => {
    if (!isoString) return "TBA";
    try {
      return new Date(isoString).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      });
    } catch {
      return "TBA";
    }
  };

  return (
    <section className="py-10 sm:py-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center text-sm text-[#a1a1aa]">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-[#71717a]" />
          <Link href="/tournaments" className="transition-colors hover:text-white">
            Tournaments
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-[#71717a]" />
          <span aria-current="page" className="truncate text-white">
            {tournament.title}
          </span>
        </nav>

        {/* HERO SECTION */}
        <div
          id="tournament-hero"
          className={`relative overflow-hidden rounded-2xl border border-[#26262c] p-6 sm:p-10 ${
            isBgmi
              ? "bg-gradient-to-br from-[#121c29] via-[#0f141d] to-[#131316]"
              : "bg-gradient-to-br from-[#2a170d] via-[#1a120c] to-[#131316]"
          }`}
        >
          {tournament.banner ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tournament.banner}
                alt={tournament.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/70 to-transparent" />
            </>
          ) : null}

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold tracking-wide ${
                  isBgmi ? "bg-[#26394d] text-[#b9d5ef]" : "bg-[#49311d] text-[#f2c48d]"
                }`}
              >
                {gameLabel}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-medium backdrop-blur-sm ${statusInfo.badgeClass}`}
              >
                {statusInfo.dotColor && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: statusInfo.dotColor }}
                  />
                )}
                {statusInfo.label}
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                {tournament.mode || "Squad"} Mode
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {tournament.title}
            </h1>
            {tournament.description ? (
              <p className="mt-3 max-w-3xl text-base text-[#a1a1aa] leading-relaxed">
                {tournament.description}
              </p>
            ) : null}

            {/* Hero Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#26262c] pt-6 sm:grid-cols-4">
              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Trophy className="h-3.5 w-3.5 text-[#e5484d]" /> Total Prize Pool
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-[#e5484d] sm:text-3xl">
                  {formatCurrencyINR(tournament.prizePool)}
                </p>
              </div>

              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Coins className="h-3.5 w-3.5 text-zinc-400" /> Entry Fee
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                  {entryFeeDisplay}
                </p>
              </div>

              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Users className="h-3.5 w-3.5 text-zinc-400" /> Teams
                </span>
                <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                  {tournament.registeredCount} / {tournament.maxTeams}
                </p>
              </div>

              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <CalendarDays className="h-3.5 w-3.5 text-zinc-400" /> Start Date
                </span>
                <p className="mt-1 text-sm font-semibold text-white">
                  {formatDate(tournament.tournamentStart)}
                </p>
              </div>
            </div>

            {/* Primary CTAs in Hero */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                id="hero-register-btn"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-6 text-sm font-bold text-white shadow-[0_4px_20px_rgba(229,72,77,0.3)] transition-all hover:bg-[#d03d42] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
              >
                <Smartphone className="h-4 w-4" />
                <span>REGISTER IN APP</span>
              </a>

              <ShareTournamentButton
                url={canonicalUrl}
                title={`${tournament.title} on BattleNix`}
                text={`Compete in ${tournament.title} on BattleNix! Prize pool: ${formatCurrencyINR(tournament.prizePool)}`}
              />
            </div>
          </div>
        </div>

        {/* DETAILS GRID: OVERVIEW & SCHEDULE & STAGES */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Main Column (2 spans) */}
          <div className="space-y-10 lg:col-span-2">
            {/* OVERVIEW SECTION */}
            <section
              id="tournament-overview"
              className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
            >
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                <InfoIcon className="h-5 w-5 text-[#e5484d]" />
                Tournament Overview
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#202026] bg-[#18181c] p-4">
                  <p className="text-xs text-[#a1a1aa]">Game Title</p>
                  <p className="mt-1 text-base font-semibold text-white">{gameLabel}</p>
                </div>
                <div className="rounded-lg border border-[#202026] bg-[#18181c] p-4">
                  <p className="text-xs text-[#a1a1aa]">Competition Mode</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {tournament.mode || "Squad"}
                  </p>
                </div>
                <div className="rounded-lg border border-[#202026] bg-[#18181c] p-4">
                  <p className="text-xs text-[#a1a1aa]">Registration Window</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {formatDate(tournament.registrationStart)} – {formatDate(tournament.registrationEnd)}
                  </p>
                </div>
                <div className="rounded-lg border border-[#202026] bg-[#18181c] p-4">
                  <p className="text-xs text-[#a1a1aa]">Tournament Schedule</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {formatDate(tournament.tournamentStart)}
                  </p>
                </div>
              </div>

              {/* Slots progress bar */}
              <div className="mt-6 rounded-lg border border-[#202026] bg-[#18181c] p-4">
                <div className="flex items-center justify-between text-xs font-medium text-[#a1a1aa]">
                  <span>Tournament Capacity</span>
                  <span className="font-mono text-white">
                    {tournament.registeredCount} of {tournament.maxTeams} spots filled (
                    {Math.round(teamProgress)}%)
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#26262c]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#e5484d] to-[#ff777b]"
                    style={{ width: `${teamProgress}%` }}
                  />
                </div>
              </div>
            </section>

            {/* STAGES SECTION (if available) */}
            {tournament.stages && tournament.stages.length > 0 && (
              <section
                id="tournament-stages"
                className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
              >
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                  <Layers className="h-5 w-5 text-[#e5484d]" />
                  Tournament Stages
                </h2>
                <p className="mt-1 text-sm text-[#a1a1aa]">
                  Official qualification progression through stages.
                </p>

                <div className="mt-6 space-y-3">
                  {tournament.stages.map((stage, idx) => (
                    <div
                      key={stage.id || idx}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#202026] bg-[#18181c] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#26262c] font-mono text-xs font-bold text-white">
                          #{stage.order || idx + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-white">{stage.name}</h3>
                          <p className="text-xs text-[#a1a1aa]">
                            Top {stage.teamsAdvancing} teams advance per group
                          </p>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                            stage.status === "ACTIVE"
                              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : stage.status === "COMPLETED"
                              ? "border border-white/10 bg-white/5 text-[#a1a1aa]"
                              : "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {stage.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* MATCHES SECTION */}
            {matches.length > 0 && (
              <section
                id="tournament-matches"
                className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
              >
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                  <Swords className="h-5 w-5 text-[#e5484d]" />
                  Matches
                </h2>
                <p className="mt-1 text-sm text-[#a1a1aa]">
                  All scheduled and completed matches for this tournament.
                </p>

                <div className="mt-6 space-y-2">
                  {matches.map((match) => {
                    const mStatus = getMatchStatusDisplay(match.status);
                    return (
                      <Link
                        key={match._id}
                        href={`/tournaments/${id}/matches/${match._id}`}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#202026] bg-[#18181c] px-4 py-3 text-sm transition-colors hover:border-[#3a3a45] hover:bg-[#1f1f26] group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#26262c] font-mono text-xs font-bold text-white">
                            {match.matchNumber}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-white group-hover:text-[#e5484d] transition-colors">
                              Match #{match.matchNumber}
                            </p>
                            <p className="truncate text-xs text-[#a1a1aa]">
                              Stage {match.stageNumber} &middot; {match.map || "Map TBA"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {match.status === "COMPLETED" && (
                            <span className="flex items-center gap-1 text-xs text-emerald-400">
                              <Zap className="h-3 w-3" /> Results
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${mStatus.badgeClass}`}
                          >
                            {mStatus.dotColor && (
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 animate-pulse rounded-full"
                                style={{ backgroundColor: mStatus.dotColor }}
                              />
                            )}
                            {mStatus.label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#71717a] shrink-0" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* RULES SECTION (if available) */}
            {tournament.rulesSummary && (
              <section
                id="tournament-rules"
                className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
              >
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                  <ShieldCheck className="h-5 w-5 text-[#e5484d]" />
                  Rules & Fair Play
                </h2>
                <div className="mt-4 whitespace-pre-line rounded-lg border border-[#202026] bg-[#18181c] p-4 text-sm text-[#a1a1aa] leading-relaxed">
                  {tournament.rulesSummary}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (1 span) */}
          <div className="space-y-6">
            {/* PRIZE BREAKDOWN (if available) */}
            <div
              id="tournament-prizes"
              className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
            >
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
                <Trophy className="h-5 w-5 text-[#e5484d]" />
                Prize Distribution
              </h2>
              <div className="mt-4 border-b border-[#26262c] pb-4">
                <p className="text-xs uppercase tracking-wider text-[#a1a1aa]">Total Prize Pool</p>
                <p className="mt-1 font-display text-3xl font-bold text-[#e5484d]">
                  {formatCurrencyINR(tournament.prizePool)}
                </p>
              </div>

              {tournament.prizeBreakdown && tournament.prizeBreakdown.length > 0 ? (
                <ul className="mt-4 divide-y divide-[#202026]">
                  {tournament.prizeBreakdown.map((prize, idx) => (
                    <li key={idx} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium text-zinc-300">
                        {prize.position === 1
                          ? "🥇 1st Place"
                          : prize.position === 2
                          ? "🥈 2nd Place"
                          : prize.position === 3
                          ? "🥉 3rd Place"
                          : `Rank ${prize.position}`}
                      </span>
                      <span className="font-bold text-white">
                        {formatCurrencyINR(prize.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-xs text-[#a1a1aa] leading-relaxed">
                  Detailed placement distribution will be finalized in the BattleNix app during the
                  event.
                </p>
              )}
            </div>

            {/* HOW TO PARTICIPATE CARD */}
            <div className="rounded-xl border border-[#303038] bg-gradient-to-b from-[#18181f] to-[#131316] p-6">
              <h3 className="font-display text-lg font-bold text-white">How to Participate</h3>
              <ol className="mt-4 space-y-3 text-xs text-[#a1a1aa]">
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5484d]/20 font-bold text-[#e5484d]">
                    1
                  </span>
                  <span>Install BattleNix on your Android device.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5484d]/20 font-bold text-[#e5484d]">
                    2
                  </span>
                  <span>Assemble your squad and link your game UID.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e5484d]/20 font-bold text-[#e5484d]">
                    3
                  </span>
                  <span>Confirm registration in the app before the deadline.</span>
                </li>
              </ol>

              <div className="mt-6 border-t border-[#26262c] pt-5">
                <a
                  id="sidebar-register-btn"
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(229,72,77,0.25)] transition-all hover:bg-[#d03d42] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>PLAY IN APP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

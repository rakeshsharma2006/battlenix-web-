import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  Swords,
  ArrowLeft,
  Smartphone,
  Map,
  Trophy,
  Zap,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fetchPublicMatchById } from "@/lib/api";
import {
  getMatchStatusDisplay,
  normalizeGameLabel,
} from "@/lib/tournaments";
import { PLAY_STORE_URL, SITE_URL } from "@/lib/constants";
import { ShareMatchButton } from "@/components/tournaments/ShareMatchButton";

type MatchPageProps = {
  params: Promise<{ id: string; matchId: string }>;
};

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { id, matchId } = await params;
  const { match } = await fetchPublicMatchById(id, matchId);

  if (!match) {
    return {
      title: "Match Not Found | BattleNix",
      description: "This BattleNix esports match is no longer available or does not exist.",
      alternates: { canonical: `${SITE_URL}/tournaments/${id}/matches/${matchId}` },
    };
  }

  const gameLabel = normalizeGameLabel(match.game);
  const statusInfo = getMatchStatusDisplay(match.status);
  const title = `Match #${match.matchNumber} – ${match.tournamentTitle} | BattleNix`;
  const description = `${statusInfo.label}: ${gameLabel} ${match.mode} match in ${match.stageName} (${match.groupName}) of ${match.tournamentTitle} on BattleNix. Map: ${match.map || "TBA"}.`;
  const canonicalUrl = `${SITE_URL}/tournaments/${id}/matches/${matchId}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "BattleNix",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id, matchId } = await params;
  const { match, status } = await fetchPublicMatchById(id, matchId);

  if (!match) {
    if (status === 404 || status === 400) {
      notFound();
    }

    return (
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-lg rounded-xl border border-red-500/20 bg-red-950/10 p-8 text-center">
            <h1 className="font-display text-2xl font-bold text-white">
              Match temporarily unavailable
            </h1>
            <p className="mt-3 text-sm text-[#a1a1aa]">
              Could not retrieve this match right now. Please try again later.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href={`/tournaments/${id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-5 py-2 text-sm font-semibold text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Tournament
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const gameLabel = normalizeGameLabel(match.game);
  const statusInfo = getMatchStatusDisplay(match.status);
  const canonicalUrl = `${SITE_URL}/tournaments/${id}/matches/${matchId}`;

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

  // Deep link for BattleNix app to open the specific match
  const appDeepLink = `https://battlenix.in/tournaments/${id}/matches/${matchId}`;

  const hasStandings = match.isCompleted && match.standings && match.standings.length > 0;

  return (
    <section className="py-10 sm:py-16">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center text-sm text-[#a1a1aa]">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-[#71717a]" />
          <Link href="/tournaments" className="transition-colors hover:text-white">Tournaments</Link>
          <ChevronRight className="mx-2 h-4 w-4 text-[#71717a]" />
          <Link href={`/tournaments/${id}`} className="max-w-[140px] truncate transition-colors hover:text-white sm:max-w-xs">
            {match.tournamentTitle}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-[#71717a]" />
          <span aria-current="page" className="text-white">
            Match #{match.matchNumber}
          </span>
        </nav>

        {/* HERO CARD */}
        <div
          id="match-hero"
          className="relative overflow-hidden rounded-2xl border border-[#26262c] bg-gradient-to-br from-[#17191f] via-[#131316] to-[#0f1015] p-6 sm:p-10"
        >
          {/* Subtle grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)",
            }}
          />

          <div className="relative z-10">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-md bg-[#26262c] px-3 py-1 text-xs font-semibold tracking-wide text-zinc-300">
                {gameLabel}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-medium backdrop-blur-sm ${statusInfo.badgeClass}`}
              >
                {statusInfo.dotColor && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ backgroundColor: statusInfo.dotColor }}
                  />
                )}
                {statusInfo.label}
              </span>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                {match.mode} Mode
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Match #{match.matchNumber}
            </h1>
            <p className="mt-2 text-base text-[#a1a1aa]">
              {match.stageName} &middot; {match.groupName} &middot; {match.tournamentTitle}
            </p>

            {/* Quick metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#26262c] pt-6 sm:grid-cols-4">
              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Swords className="h-3.5 w-3.5 text-[#e5484d]" /> Stage
                </span>
                <p className="mt-1 text-base font-bold text-white">{match.stageName}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Star className="h-3.5 w-3.5 text-zinc-400" /> Group
                </span>
                <p className="mt-1 text-base font-bold text-white">{match.groupName}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <Map className="h-3.5 w-3.5 text-zinc-400" /> Map
                </span>
                <p className="mt-1 text-base font-bold text-white">{match.map || "TBA"}</p>
              </div>
              <div>
                <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
                  <CalendarDays className="h-3.5 w-3.5 text-zinc-400" /> Scheduled
                </span>
                <p className="mt-1 text-sm font-semibold text-white">{formatDate(match.scheduledAt)}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                id="match-open-app-btn"
                href={appDeepLink}
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-6 text-sm font-bold text-white shadow-[0_4px_20px_rgba(229,72,77,0.3)] transition-all hover:bg-[#d03d42] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
              >
                <Smartphone className="h-4 w-4" />
                <span>OPEN IN APP</span>
              </a>

              <ShareMatchButton
                url={canonicalUrl}
                title={`Match #${match.matchNumber} – ${match.tournamentTitle}`}
                text={`Watch Match #${match.matchNumber} live on BattleNix! ${gameLabel} ${match.mode} in ${match.stageName}.`}
              />
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Main: standings or placeholder */}
          <div className="space-y-8 lg:col-span-2">
            {hasStandings ? (
              <section
                id="match-standings"
                className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
              >
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                  <Trophy className="h-5 w-5 text-[#e5484d]" />
                  Match Standings
                </h2>
                <p className="mt-1 text-sm text-[#a1a1aa]">
                  Official approved results for this match.
                </p>

                {/* Desktop table */}
                <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#202026] sm:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#202026] bg-[#18181c] text-left text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                        <th className="w-12 px-4 py-3">#</th>
                        <th className="px-4 py-3">Team</th>
                        <th className="px-4 py-3 text-right">
                          <span className="flex items-center justify-end gap-1">
                            <Zap className="h-3.5 w-3.5 text-amber-400" /> Kills
                          </span>
                        </th>
                        <th className="px-4 py-3 text-right">Placement Pts</th>
                        <th className="px-4 py-3 text-right font-bold text-white">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1c1c22]">
                      {match.standings.map((row) => {
                        const isTop3 = row.rank <= 3;
                        return (
                          <tr
                            key={row.teamId}
                            className={`transition-colors ${
                              isTop3
                                ? "bg-gradient-to-r from-[#1f1a10]/60 to-transparent"
                                : "hover:bg-[#18181c]"
                            }`}
                          >
                            <td className="px-4 py-3.5 font-mono text-xs font-bold">
                              {row.rank === 1 ? (
                                <span className="text-amber-400">&#x1F947;</span>
                              ) : row.rank === 2 ? (
                                <span className="text-zinc-300">&#x1F948;</span>
                              ) : row.rank === 3 ? (
                                <span className="text-amber-700">&#x1F949;</span>
                              ) : (
                                <span className="text-[#a1a1aa]">#{row.rank}</span>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                {row.teamLogo ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={row.teamLogo}
                                    alt={`${row.teamName} logo`}
                                    className="h-8 w-8 rounded-md object-cover"
                                  />
                                ) : (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#26262c] text-xs font-bold text-white">
                                    {(row.teamTag || row.teamName.slice(0, 2)).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="font-semibold text-white">{row.teamName}</p>
                                  {row.teamTag && (
                                    <p className="text-xs text-[#a1a1aa]">{row.teamTag}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-right font-mono font-semibold text-amber-300">
                              {row.kills}
                            </td>
                            <td className="px-4 py-3.5 text-right font-mono text-zinc-300">
                              {row.placementPoints}
                            </td>
                            <td className="px-4 py-3.5 text-right font-mono text-base font-bold text-white">
                              {row.totalPoints}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="mt-6 space-y-3 sm:hidden">
                  {match.standings.map((row) => (
                    <div
                      key={row.teamId}
                      className="flex items-center gap-3 rounded-lg border border-[#202026] bg-[#18181c] p-3"
                    >
                      <span className="w-8 shrink-0 text-center font-mono text-sm font-bold">
                        {row.rank === 1
                          ? "\u{1F947}"
                          : row.rank === 2
                          ? "\u{1F948}"
                          : row.rank === 3
                          ? "\u{1F949}"
                          : `#${row.rank}`}
                      </span>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#26262c] text-xs font-bold text-white">
                        {(row.teamTag || row.teamName.slice(0, 2)).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-white">{row.teamName}</p>
                        {row.teamTag && (
                          <p className="text-xs text-[#a1a1aa]">{row.teamTag}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-base font-bold text-white">{row.totalPoints}</p>
                        <p className="text-xs text-[#a1a1aa]">
                          K:{row.kills} P:{row.placementPoints}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section
                id="match-pending"
                className="rounded-xl border border-[#26262c] bg-[#131316] p-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#26262c]">
                  <Trophy className="h-8 w-8 text-[#a1a1aa]" />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-white">
                  {match.status === "LIVE"
                    ? "Match is Live!"
                    : match.status === "CHECKIN"
                    ? "Check-In in Progress"
                    : "Results Not Yet Available"}
                </h2>
                <p className="mt-2 text-sm text-[#a1a1aa]">
                  {match.status === "LIVE"
                    ? "This match is currently live. Results will appear here once officially approved."
                    : match.status === "CHECKIN"
                    ? "Teams are checking in. The match will start shortly."
                    : "Match results will be published here after the match concludes and results are approved."}
                </p>
                <a
                  id="match-live-app-btn"
                  href={appDeepLink}
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-6 text-sm font-bold text-white shadow-[0_4px_16px_rgba(229,72,77,0.25)] transition-all hover:bg-[#d03d42]"
                >
                  <Smartphone className="h-4 w-4" /> Follow Live in App
                </a>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match info card */}
            <div
              id="match-info"
              className="rounded-xl border border-[#26262c] bg-[#131316] p-6"
            >
              <h2 className="font-display text-lg font-bold text-white">Match Info</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <dt className="text-[#a1a1aa]">Tournament</dt>
                  <dd className="max-w-[60%] truncate text-right font-medium text-white">
                    <Link href={`/tournaments/${id}`} className="transition-colors hover:text-[#e5484d]">
                      {match.tournamentTitle}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Game</dt>
                  <dd className="font-medium text-white">{gameLabel}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Mode</dt>
                  <dd className="font-medium text-white">{match.mode}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Stage</dt>
                  <dd className="font-medium text-white">{match.stageName}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Group</dt>
                  <dd className="font-medium text-white">{match.groupName}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Map</dt>
                  <dd className="font-medium text-white">{match.map || "TBA"}</dd>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-[#202026] pt-3">
                  <dt className="text-[#a1a1aa]">Scheduled</dt>
                  <dd className="text-right font-medium text-white">{formatDate(match.scheduledAt)}</dd>
                </div>
              </dl>
            </div>

            {/* App CTA sidebar */}
            <div className="rounded-xl border border-[#303038] bg-gradient-to-b from-[#18181f] to-[#131316] p-6">
              <h3 className="font-display text-lg font-bold text-white">Watch on BattleNix</h3>
              <p className="mt-2 text-xs text-[#a1a1aa]">
                Get live updates, room credentials, and results directly in the BattleNix app.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  id="sidebar-open-app-btn"
                  href={appDeepLink}
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-4 text-sm font-bold text-white shadow-[0_4px_16px_rgba(229,72,77,0.25)] transition-all hover:bg-[#d03d42] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>OPEN IN APP</span>
                </a>
                <a
                  id="sidebar-play-store-btn"
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#303038] bg-[#1a1a1f] px-4 text-sm font-semibold text-zinc-300 transition-all hover:border-[#71717a] hover:bg-[#26262c]"
                >
                  Download BattleNix
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-10">
          <Link
            href={`/tournaments/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#a1a1aa] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Tournament
          </Link>
        </div>
      </Container>
    </section>
  );
}

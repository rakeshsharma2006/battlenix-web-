import Link from "next/link";
import { ArrowRight, CalendarDays, Gamepad2, Users, Trophy } from "lucide-react";
import type { PublicTournamentListItem } from "@/lib/tournaments";
import {
  formatCurrencyINR,
  getStatusDisplay,
  normalizeGameLabel,
} from "@/lib/tournaments";

interface TournamentCardProps {
  tournament: PublicTournamentListItem;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const isBgmi = (tournament.game || "").toUpperCase().includes("BGMI");
  const gameLabel = normalizeGameLabel(tournament.game);
  const statusInfo = getStatusDisplay(tournament.status);

  const teamProgress =
    tournament.maxTeams > 0
      ? Math.min(100, (tournament.registeredCount / tournament.maxTeams) * 100)
      : 0;

  const formattedDate = tournament.tournamentStart
    ? new Date(tournament.tournamentStart).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "TBA";

  const entryFeeDisplay =
    tournament.entryFee === 0 ? "FREE" : formatCurrencyINR(tournament.entryFee);

  return (
    <article
      id={`tournament-card-${tournament.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#26262c] bg-[#131316] transition-all duration-300 hover:border-[#e5484d]/50 hover:shadow-[0_8px_30px_rgba(229,72,77,0.12)]"
    >
      {/* Banner / Header Visual */}
      <div
        className={`relative flex min-h-48 flex-col justify-between overflow-hidden p-5 transition-all ${
          isBgmi
            ? "bg-gradient-to-br from-[#121c29] via-[#0f141d] to-[#131316]"
            : "bg-gradient-to-br from-[#2a170d] via-[#1a120c] to-[#131316]"
        }`}
      >
        {/* Cloudinary banner background if available */}
        {tournament.banner ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tournament.banner}
              alt={tournament.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-black/60" />
          </>
        ) : (
          <div
            className={`absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl opacity-20 ${
              isBgmi ? "bg-sky-500" : "bg-orange-500"
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ${
              isBgmi ? "bg-[#26394d] text-[#b9d5ef]" : "bg-[#49311d] text-[#f2c48d]"
            }`}
          >
            {gameLabel}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${statusInfo.badgeClass}`}
          >
            {statusInfo.dotColor ? (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: statusInfo.dotColor }}
              />
            ) : null}
            {statusInfo.label}
          </span>
        </div>

        {/* Title & Mode */}
        <div className="relative z-10 mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            {tournament.mode || "Squad"} Tournament
          </p>
          <h2 className="mt-1 line-clamp-2 break-words font-display text-2xl font-bold text-white transition-colors group-hover:text-[#ff777b]">
            {tournament.title}
          </h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Prize & Entry Fee */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#26262c] pb-4">
          <div>
            <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-[#a1a1aa]">
              <Trophy className="h-3.5 w-3.5 text-[#e5484d]" aria-hidden="true" />
              Prize Pool
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight text-[#e5484d]">
              {formatCurrencyINR(tournament.prizePool)}
            </p>
          </div>
          <div className="pb-1 text-right">
            <p className="text-xs text-[#71717a]">Entry Fee</p>
            <p className="mt-1 text-base font-semibold text-white">{entryFeeDisplay}</p>
          </div>
        </div>

        {/* Meta Grid */}
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div className="flex min-w-0 items-start gap-2">
            <Gamepad2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#71717a]" />
            <div className="min-w-0">
              <dt className="text-xs text-[#71717a]">Format</dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-[#f4f4f5]">
                {tournament.mode || "Squad"}
              </dd>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-2">
            <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#71717a]" />
            <div className="min-w-0">
              <dt className="text-xs text-[#71717a]">Starts</dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-[#f4f4f5]">
                {formattedDate}
              </dd>
            </div>
          </div>

          <div className="col-span-2 flex min-w-0 items-start gap-2">
            <Users aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#71717a]" />
            <div className="min-w-0 flex-1">
              <dt className="flex items-center justify-between text-xs text-[#71717a]">
                <span>Registered Teams</span>
                <span className="font-mono text-zinc-300">
                  {tournament.registeredCount} / {tournament.maxTeams}
                </span>
              </dt>
              <dd className="mt-1.5">
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-[#26262c]"
                  role="progressbar"
                  aria-valuenow={tournament.registeredCount}
                  aria-valuemin={0}
                  aria-valuemax={tournament.maxTeams}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#e5484d] to-[#ff777b] transition-all duration-300"
                    style={{ width: `${teamProgress}%` }}
                  />
                </div>
              </dd>
            </div>
          </div>
        </dl>

        {/* CTA */}
        <div className="mt-auto pt-5">
          <Link
            id={`view-tournament-btn-${tournament.id}`}
            href={`/tournaments/${tournament.id}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#303038] bg-[#1a1a1f] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#e5484d] hover:bg-[#e5484d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
          >
            <span>View Tournament</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

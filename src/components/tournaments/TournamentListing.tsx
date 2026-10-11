"use client";

import { useMemo, useState } from "react";
import { Gamepad2, RefreshCw, Trophy, AlertTriangle } from "lucide-react";
import { TournamentCard } from "@/components/ui/TournamentCard";
import type { PublicTournamentListItem, GameFilterValue } from "@/lib/tournaments";

interface TournamentListingProps {
  initialTournaments: PublicTournamentListItem[];
  initialError?: string | null;
}

const GAME_FILTERS: { value: GameFilterValue; label: string }[] = [
  { value: "ALL", label: "ALL" },
  { value: "BGMI", label: "BGMI" },
  { value: "FREE_FIRE", label: "FREE FIRE" },
];

export function TournamentListing({
  initialTournaments,
  initialError,
}: TournamentListingProps) {
  const [selectedGame, setSelectedGame] = useState<GameFilterValue>("ALL");
  const [tournaments] = useState<PublicTournamentListItem[]>(initialTournaments);
  const [error] = useState<string | null>(initialError ?? null);

  const filteredTournaments = useMemo(() => {
    if (selectedGame === "ALL") return tournaments;
    if (selectedGame === "BGMI") {
      return tournaments.filter((t) => (t.game || "").toUpperCase() === "BGMI");
    }
    if (selectedGame === "FREE_FIRE") {
      return tournaments.filter(
        (t) =>
          (t.game || "").toUpperCase() === "FREE_FIRE" ||
          (t.game || "").toUpperCase() === "FREE FIRE",
      );
    }
    return tournaments;
  }, [tournaments, selectedGame]);

  if (error) {
    return (
      <div
        id="tournaments-error-state"
        className="mt-8 rounded-xl border border-red-500/20 bg-red-950/10 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold text-white">
          BattleNix tournaments are temporarily unavailable
        </h2>
        <p className="mt-2 text-sm text-[#a1a1aa]">
          We are unable to load the tournaments right now. Please try again in a few moments.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#e5484d] bg-[#e5484d] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="tournaments-discovery-container" className="mt-8 space-y-8">
      {/* Game Filter Bar */}
      <div className="flex flex-col gap-4 border-y border-[#26262c] py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 text-[#e5484d]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
            Select Game
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Filter tournaments by game"
          className="inline-flex flex-wrap gap-2"
        >
          {GAME_FILTERS.map((filter) => {
            const isActive = selectedGame === filter.value;
            return (
              <button
                key={filter.value}
                id={`filter-btn-${filter.value.toLowerCase()}`}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSelectedGame(filter.value)}
                className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] ${
                  isActive
                    ? "border-[#e5484d] bg-[#e5484d] text-white shadow-[0_0_15px_rgba(229,72,77,0.3)]"
                    : "border-[#26262c] bg-[#131316] text-[#a1a1aa] hover:border-[#45454d] hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Info */}
      <div className="flex items-center justify-between text-xs text-[#a1a1aa]">
        <span>
          Showing <strong className="text-white">{filteredTournaments.length}</strong>{" "}
          {filteredTournaments.length === 1 ? "tournament" : "tournaments"}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live backend sync
        </span>
      </div>

      {/* Tournament Cards Grid or Empty State */}
      {filteredTournaments.length > 0 ? (
        <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div
          id="tournaments-empty-state"
          className="rounded-xl border border-dashed border-[#303038] bg-[#131316]/50 p-12 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1e1e24] text-[#a1a1aa]">
            <Trophy className="h-7 w-7 text-[#71717a]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-white">
            {selectedGame === "ALL"
              ? "No tournaments available right now"
              : `No ${selectedGame === "BGMI" ? "BGMI" : "Free Fire"} tournaments available right now`}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#a1a1aa]">
            New competitive brackets and scrims are published regularly. Check back soon or switch
            game categories.
          </p>
          {selectedGame !== "ALL" && (
            <button
              type="button"
              onClick={() => setSelectedGame("ALL")}
              className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-[#303038] bg-[#1e1e24] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[#e5484d] hover:text-[#e5484d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
            >
              Show All Tournaments
            </button>
          )}
        </div>
      )}
    </div>
  );
}

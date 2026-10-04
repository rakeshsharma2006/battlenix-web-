"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TournamentCard } from "@/components/ui/TournamentCard";
import { getTournaments, type TournamentGame, type TournamentStatus } from "@/lib/demo-tournaments";

const games = ["All", "BGMI", "Free Fire"] as const;
const statuses = ["All", "Registration Open", "Upcoming", "Ongoing", "Completed"] as const;

export function TournamentListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    game: searchParams.get("game") || "All",
    status: searchParams.get("status") || "All",
  }));
  const filtersRef = useRef(filters);
  const tournaments = getTournaments().filter((tournament) => {
    const matchesGame = filters.game === "All" || tournament.game === filters.game;
    const matchesStatus = filters.status === "All" || tournament.status === filters.status;
    return matchesGame && matchesStatus;
  });

  const updateFilter = (key: "game" | "status", value: string) => {
    const nextFilters = { ...filtersRef.current, [key]: value };
    filtersRef.current = nextFilters;
    setFilters(nextFilters);

    const params = new URLSearchParams();
    if (nextFilters.game !== "All") params.set("game", nextFilters.game);
    if (nextFilters.status !== "All") params.set("status", nextFilters.status);
    const query = params.toString();
    router.replace(query ? `/tournaments?${query}` : "/tournaments", { scroll: false });
  };

  useEffect(() => {
    const syncFromHistory = () => {
      const params = new URLSearchParams(window.location.search);
      const nextFilters = {
        game: params.get("game") || "All",
        status: params.get("status") || "All",
      };
      filtersRef.current = nextFilters;
      setFilters(nextFilters);
    };

    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  return (
    <>
      <div className="mt-8 space-y-5 border-y border-[#26262c] py-5">
        <FilterGroup<TournamentGame | "All">
          label="Game"
          options={games}
          selected={filters.game as TournamentGame | "All"}
          onSelect={(value) => updateFilter("game", value)}
        />
        <FilterGroup<TournamentStatus | "All">
          label="Status"
          options={statuses}
          selected={filters.status as TournamentStatus | "All"}
          onSelect={(value) => updateFilter("status", value)}
        />
      </div>
      <p className="mt-5 inline-flex rounded-md border border-[#45454d] px-2.5 py-1 text-xs font-medium text-[#a1a1aa]">
        Sample data. These are previews, not live tournaments.
      </p>
      {tournaments.length ? (
        <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
          {tournaments.map((tournament) => <TournamentCard key={tournament.slug} tournament={tournament} />)}
        </div>
      ) : (
        <div className="mt-5 border border-dashed border-[#45454d] p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-white">No sample tournaments match</h2>
          <p className="mt-2 text-sm text-[#a1a1aa]">Choose another game or status filter.</p>
        </div>
      )}
    </>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

function FilterGroup<T extends string>({ label, options, selected, onSelect }: FilterGroupProps<T>) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <legend className="w-20 shrink-0 text-sm font-medium text-[#a1a1aa]">{label}</legend>
      <div className="flex min-w-0 flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={selected === option}
            onClick={() => onSelect(option)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] ${selected === option ? "border-[#e5484d] bg-[#e5484d] text-white" : "border-[#26262c] bg-[#131316] text-[#a1a1aa] hover:border-[#71717a] hover:text-white"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

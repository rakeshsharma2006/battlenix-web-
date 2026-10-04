import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tournament } from "@/lib/demo-tournaments";

const statusColor: Record<Tournament["status"], string> = {
  "Registration Open": "text-[#e5484d] border-[#e5484d]/50",
  Upcoming: "text-[#a1a1aa] border-[#45454d]",
  Ongoing: "text-[#39c47c] border-[#39c47c]/50",
  Completed: "text-[#71717a] border-[#45454d]",
};

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-xl border border-[#26262c] bg-[#131316]">
      <div className={`min-h-36 border-b border-[#26262c] p-5 ${tournament.game === "BGMI" ? "bg-[#17202a]" : "bg-[#241c15]"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tournament.game === "BGMI" ? "bg-[#26394d] text-[#b9d5ef]" : "bg-[#49311d] text-[#f2c48d]"}`}>
            {tournament.game}
          </span>
          <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium ${statusColor[tournament.status]}`}>
            {tournament.status === "Ongoing" ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#39c47c]" /> : null}
            {tournament.status}
          </span>
        </div>
        <h2 className="mt-8 break-words font-display text-2xl font-semibold text-white">{tournament.title}</h2>
        <p className="mt-1 text-sm text-[#a1a1aa]">{tournament.mode} tournament</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 p-5 text-sm">
        <Info label="Map" value={tournament.map} />
        <Info label="Date" value={new Date(tournament.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} />
        <Info label="Prize pool" value={tournament.prizePool} />
        <Info label="Entry fee" value={tournament.entryFee} />
        <Info label="Registered teams" value={`${tournament.registeredTeams} / ${tournament.totalTeams}`} />
        <Link
          href={`/tournaments/${tournament.slug}`}
          className="flex min-h-11 items-center justify-end gap-2 self-end font-semibold text-white hover:text-[#e5484d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
        >
          View Tournament <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-[#71717a]">{label}</p>
      <p className="mt-1 break-words font-medium text-[#f4f4f5]">{value}</p>
    </div>
  );
}

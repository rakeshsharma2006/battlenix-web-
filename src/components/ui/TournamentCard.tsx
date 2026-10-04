import Link from "next/link";
import { ArrowRight, CalendarDays, Gamepad2, MapPin, Users } from "lucide-react";
import type { Tournament } from "@/lib/demo-tournaments";

const statusClasses: Record<Tournament["status"], string> = {
  "Registration Open": "border-[#e5484d]/45 bg-[#0b0b0d]/80 text-[#ff777b]",
  Upcoming: "border-white/15 bg-[#0b0b0d]/80 text-[#d4d4d8]",
  Ongoing: "border-[#39c47c]/45 bg-[#0b0b0d]/80 text-[#39c47c]",
  Completed: "border-white/10 bg-[#0b0b0d]/80 text-[#a1a1aa]",
};

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  const teamProgress = tournament.totalTeams > 0
    ? Math.min(100, (tournament.registeredTeams / tournament.totalTeams) * 100)
    : 0;

  return (
    <article className="tournament-card group min-w-0 overflow-hidden rounded-xl border border-[#26262c] bg-[#131316]">
      <div
        className={`tournament-banner tournament-banner--${tournament.game === "BGMI" ? "bgmi" : "freefire"} relative flex min-h-52 flex-col justify-between overflow-hidden p-5`}
        data-game={tournament.game}
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tournament.game === "BGMI" ? "bg-[#26394d] text-[#b9d5ef]" : "bg-[#49311d] text-[#f2c48d]"}`}>
            {tournament.game}
          </span>
          <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium ${statusClasses[tournament.status]}`}>
            {tournament.status === "Ongoing" ? <span aria-hidden="true" className="live-dot h-1.5 w-1.5 rounded-full bg-[#39c47c]" /> : null}
            {tournament.status}
          </span>
        </div>
        <div className="relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">{tournament.mode} event</p>
          <h2 className="mt-1 break-words font-display text-2xl font-semibold text-white">{tournament.title}</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#26262c] pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#a1a1aa]">Prize pool</p>
            <p className="mt-1 break-words font-display text-3xl font-bold text-[#e5484d]">{tournament.prizePool}</p>
          </div>
          <div className="pb-1 text-right">
            <p className="text-xs text-[#71717a]">Entry fee</p>
            <p className="mt-1 font-semibold text-white">{tournament.entryFee}</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Info icon={<Gamepad2 aria-hidden="true" />} label="Format" value={tournament.mode} />
          <Info icon={<MapPin aria-hidden="true" />} label="Map" value={tournament.map} />
          <Info icon={<CalendarDays aria-hidden="true" />} label="Date" value={new Date(tournament.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} />
          <Info icon={<Users aria-hidden="true" />} label="Teams" value={`${tournament.registeredTeams} / ${tournament.totalTeams}`} />
        </dl>

        <div className="mt-4" aria-label={`${tournament.registeredTeams} of ${tournament.totalTeams} sample teams registered`}>
          <div className="h-1 overflow-hidden rounded-full bg-[#26262c]">
            <div className="h-full rounded-full bg-[#e5484d]" style={{ width: `${teamProgress}%` }} />
          </div>
        </div>

        <Link
          href={`/tournaments/${tournament.slug}`}
          className="card-cta mt-4 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
        >
          View Tournament <ArrowRight aria-hidden="true" className="card-cta-arrow h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 shrink-0 text-[#71717a]">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-[#71717a]">{label}</dt>
        <dd className="mt-0.5 break-words text-sm font-medium text-[#f4f4f5]">{value}</dd>
      </div>
    </div>
  );
}

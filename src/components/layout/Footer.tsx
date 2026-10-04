import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const socialEntries = Object.entries(SOCIAL_LINKS).reduce<Array<[string, string]>>(
  (acc, [key, value]) => {
    if (value) {
      acc.push([key, value]);
    }
    return acc;
  },
  [],
);

export function Footer() {
  return (
    <footer className="border-t border-[#26262c] bg-[#0b0b0d] print:hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-3">
              <span className="font-display text-xl font-bold text-white sm:text-2xl">
                <span className="text-[#e5484d]">Battle</span>Nix
              </span>
            </div>
            <p className="mt-4 max-w-md break-words text-sm leading-7 text-zinc-300">
              BattleNix helps players discover team-based BGMI and Free Fire tournaments,
              stay on top of match results, and keep the competitive experience moving.
            </p>
            <p className="mt-4 break-words text-xs leading-6 text-zinc-500">
              BattleNix is not affiliated with or endorsed by Krafton or Garena. BGMI and Free Fire belong to their owners.
            </p>
          </div>

          {([
            ["Explore", FOOTER_LINKS.explore],
            ["Support", FOOTER_LINKS.support],
            ["Legal", FOOTER_LINKS.legal],
          ] as const).map(([heading, links]) => (
            <div key={heading} className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="break-words hover:text-white">
                    {label}
                  </Link>
                </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialEntries.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {socialEntries.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#26262c] px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-200 hover:bg-[#131316] hover:text-white"
              >
                {key}
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-10 border-t border-[#26262c] pt-6 text-center text-sm text-zinc-400">
          <p>© 2026 BattleNix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DesktopNavItems() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-white/8 text-white ring-1 ring-white/10"
                : "text-zinc-300 hover:bg-white/5 hover:text-white",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

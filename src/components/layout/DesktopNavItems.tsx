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
              "nav-link relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
              isActive
                ? "text-white"
                : "text-zinc-300 hover:text-white",
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

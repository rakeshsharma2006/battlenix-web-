"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LEGAL_LINKS, MOBILE_EXTRA_LINKS, NAV_LINKS, PLAY_STORE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ pathname, isOpen: false });
  const isOpen = menuState.pathname === pathname && menuState.isOpen;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuState({ pathname, isOpen: false });
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuState({ pathname, isOpen: !isOpen })}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#26262c] bg-[#131316] text-zinc-100 transition-colors hover:bg-[#1a1a1f]"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-4 top-[72px] z-50 max-h-[calc(100dvh-88px)] overflow-y-auto rounded-xl border border-[#26262c] bg-[#131316] p-3 transition-all duration-200",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <nav aria-label="Mobile navigation" className="space-y-1">
          {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuState({ pathname, isOpen: false })}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium transition-colors",
                  isActive
                    ? "bg-[#1a1a1f] text-white"
                    : "text-zinc-300 hover:bg-[#1a1a1f] hover:text-white",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}

          <div className="border-t border-[#26262c] px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Legal
          </div>
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuState({ pathname, isOpen: false })}
              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-[#1a1a1f] hover:text-white"
            >
              {label}
            </Link>
          ))}

          <Link
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-11 w-full items-center justify-center rounded-[10px] bg-[#e5484d] px-4 py-3 text-sm font-semibold text-white"
          >
            <FaGooglePlay aria-hidden="true" className="mr-2 h-4 w-4" />
            Download App
          </Link>
        </nav>
      </div>
    </div>
  );
}

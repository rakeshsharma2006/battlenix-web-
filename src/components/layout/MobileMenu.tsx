"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { LEGAL_LINKS, MOBILE_EXTRA_LINKS, NAV_LINKS, PLAY_STORE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);
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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (isOpen) firstMenuItemRef.current?.focus();
      else if (wasOpen.current) toggleRef.current?.focus();
    });
    wasOpen.current = isOpen;
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
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
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "mobile-menu-panel fixed inset-x-4 top-[72px] z-50 max-h-[calc(100dvh-88px)] overflow-y-auto rounded-xl border border-[#26262c] bg-[#131316] p-3",
        )}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <nav aria-label="Mobile navigation" className="space-y-1">
          {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map(({ href, label }, index) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                ref={index === 0 ? firstMenuItemRef : undefined}
                href={href}
                onClick={() => setMenuState({ pathname, isOpen: false })}
                style={{ "--menu-index": index } as CSSProperties}
                className={cn(
                  "mobile-menu-item flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium transition-colors",
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

          <div className="mobile-menu-item border-t border-[#26262c] px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500" style={{ "--menu-index": NAV_LINKS.length + MOBILE_EXTRA_LINKS.length } as CSSProperties}>
            Legal
          </div>
          {LEGAL_LINKS.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuState({ pathname, isOpen: false })}
              style={{ "--menu-index": NAV_LINKS.length + MOBILE_EXTRA_LINKS.length + index + 1 } as CSSProperties}
              className="mobile-menu-item flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-[#1a1a1f] hover:text-white"
            >
              {label}
            </Link>
          ))}

          <Link
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ "--menu-index": NAV_LINKS.length + MOBILE_EXTRA_LINKS.length + LEGAL_LINKS.length + 1 } as CSSProperties}
            className="mobile-menu-item mt-2 flex min-h-11 w-full items-center justify-center rounded-[10px] bg-[#e5484d] px-4 py-3 text-sm font-semibold text-white"
          >
            <FaGooglePlay aria-hidden="true" className="mr-2 h-4 w-4" />
            Download App
          </Link>
        </nav>
      </div>
    </div>
  );
}

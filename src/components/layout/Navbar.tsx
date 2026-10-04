"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { DesktopNavItems } from "@/components/layout/DesktopNavItems";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { PLAY_STORE_URL } from "@/lib/constants";

export function Navbar() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px" />
    <header data-scrolled={isScrolled} className="nav-header sticky top-0 z-40 border-b border-[#26262c] bg-[#0b0b0d] print:hidden">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="BattleNix home">
          <span className="font-display text-xl font-bold text-white sm:text-2xl">
            <span className="text-[#e5484d]">Battle</span>Nix
          </span>
        </Link>

        <DesktopNavItems />

        <div className="ml-auto hidden items-center md:flex">
          <Button
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <FaGooglePlay aria-hidden="true" className="h-4 w-4" />
            Download App
          </Button>
        </div>

        <div className="ml-auto md:hidden">
          <Button
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-10 px-3 text-xs"
          >
            <FaGooglePlay aria-hidden="true" className="h-3.5 w-3.5" />
            Download
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { APP_SCREENS } from "@/lib/app-screens";

export function PhoneScene() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const warnedScreens = useRef(new Set<string>());
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerEpoch, setTimerEpoch] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[] | null>(null);
  const [failedScreenIds, setFailedScreenIds] = useState<Set<string>>(() => new Set());
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    let remaining = APP_SCREENS.length;
    const completed = new Set<number>();
    const failures = new Set<string>();
    const images = APP_SCREENS.map(() => new window.Image());

    const completePreload = (index: number, failed: boolean) => {
      if (completed.has(index)) {
        return;
      }
      completed.add(index);

      if (failed) {
        failures.add(APP_SCREENS[index].id);
      }

      remaining -= 1;
      if (remaining === 0 && !cancelled) {
        setFailedScreenIds(failures);
        setPreloadedImages(images);
      }
    };

    images.forEach((image, index) => {
      image.onload = () => completePreload(index, false);
      image.onerror = () => completePreload(index, true);
      image.src = APP_SCREENS[index].src;

      if (image.complete) {
        queueMicrotask(() => completePreload(index, image.naturalWidth === 0));
      }
    });

    return () => {
      cancelled = true;
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const initialFrame = window.requestAnimationFrame(updateMotionPreference);

    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };
    const initialFrame = window.requestAnimationFrame(handleVisibilityChange);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const element = phoneRef.current;
    if (!element) {
      return undefined;
    }
    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsIntersecting(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    failedScreenIds.forEach((id) => {
      if (warnedScreens.current.has(id)) {
        return;
      }

      const screen = APP_SCREENS.find((item) => item.id === id);
      warnedScreens.current.add(id);
      console.warn(`BattleNix screenshot failed to load: ${screen?.src ?? id}`);
    });
  }, [failedScreenIds]);

  useEffect(() => {
    if (
      !preloadedImages ||
      prefersReducedMotion !== false ||
      !isIntersecting ||
      !isPageVisible
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % APP_SCREENS.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [activeIndex, isIntersecting, isPageVisible, prefersReducedMotion, preloadedImages, timerEpoch]);

  const handleImageError = (id: string) => {
    setFailedScreenIds((current) => new Set(current).add(id));
  };
  const displayedIndex = prefersReducedMotion ? 0 : activeIndex;

  return (
    <div ref={phoneRef} className="relative mx-auto w-full max-w-[420px]">
      <div className="relative mx-auto aspect-[9/17.5] w-full max-w-[360px] [perspective:1400px]">
        <div className="phone-float absolute inset-0 rotate-x-[8deg] rotate-y-[-10deg] rounded-[2.75rem] border border-white/15 bg-[#071018] p-[0.7rem] [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-500 hover:rotate-x-[5deg] hover:rotate-y-[-6deg]">
          <div className="relative h-full overflow-hidden rounded-[2.15rem] border border-white/10 bg-[#08111a]">
            <div className="absolute left-1/2 top-2 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-black/55" />

            <div className="absolute inset-0">
              {APP_SCREENS.map((screen, index) => {
                const isActive = index === displayedIndex;
                const failed = failedScreenIds.has(screen.id);

                return (
                  <div
                    key={screen.id}
                    className={`absolute inset-0 transition-opacity duration-[400ms] ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={screen.src}
                      alt={`${screen.title}: ${screen.description}`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top"
                      onError={() => handleImageError(screen.id)}
                      priority={index === 0}
                    />
                    {failed ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0b1220] text-sm font-medium text-slate-300">
                        Screenshot pending
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2" aria-label="App screenshots">
        {APP_SCREENS.map((screen, index) => (
          <button
            key={screen.id}
            type="button"
            aria-label={`Show ${screen.title} screenshot`}
            aria-current={index === displayedIndex ? "true" : undefined}
            disabled={prefersReducedMotion === true}
            onClick={() => {
              setActiveIndex(index);
              setTimerEpoch((current) => current + 1);
            }}
            className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b6b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0d] disabled:cursor-default ${index === displayedIndex ? "bg-[#e5484d]" : "bg-slate-600 hover:bg-slate-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

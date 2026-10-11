"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareTournamentButtonProps {
  url: string;
  title: string;
  text: string;
}

export function ShareTournamentButton({ url, title, text }: ShareTournamentButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err) {
        // Fall back to copy if user dismissed or cancelled share dialog
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback prompt
        window.prompt("Copy tournament link:", url);
      }
    }
  };

  return (
    <button
      id="share-tournament-btn"
      type="button"
      onClick={handleShare}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#303038] bg-[#1a1a1f] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-[#71717a] hover:bg-[#26262c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
      aria-label="Share this tournament"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>Share Tournament</span>
        </>
      )}
    </button>
  );
}

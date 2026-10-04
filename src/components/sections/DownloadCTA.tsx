import { FaGooglePlay } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PLAY_STORE_URL } from "@/lib/constants";

export function DownloadCTA() {
  return (
    <section className="border-t border-[#26262c] py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-[#e5484d]">Download app</p>
          <h2 className="text-balance font-display text-3xl font-bold text-white sm:text-4xl">Ready to compete?</h2>
          <p className="mt-4 text-base leading-7 text-[#a1a1aa]">
            Download BattleNix and take your tournaments with you.
          </p>
          <div className="mt-6">
            <Button href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="gap-2">
              <FaGooglePlay aria-hidden="true" className="h-4 w-4" /> Get BattleNix
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

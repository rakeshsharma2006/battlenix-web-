import { PhoneScene } from "@/components/PhoneScene";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PLAY_STORE_URL } from "@/lib/constants";
import { Atmosphere } from "@/components/motion/Atmosphere";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Atmosphere variant="hero" />
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-xl">
            <Reveal as="p" className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-[#a1a1aa]">
              <span className="text-[#e5484d]">—</span> BGMI · FREE FIRE · TOURNAMENTS
            </Reveal>

            <Reveal as="h1" delay={60} y={18} className="text-balance font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.96] text-white">
              PLAY. <span className="text-[#e5484d]">COMPETE.</span> WIN.
            </Reveal>

            <Reveal as="p" delay={130} className="mt-6 max-w-lg text-lg leading-8 text-[#a1a1aa]">
              Competitive esports tournaments built for players, teams, and communities.
            </Reveal>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Reveal delay={170} y={10}>
                <Button href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  Download App
                </Button>
              </Reveal>
              <Reveal delay={240} y={10}>
                <Button href="/tournaments" variant="outline" className="w-full sm:w-auto">
                  Explore Tournaments
                </Button>
              </Reveal>
            </div>

          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <Reveal delay={120} y={8}>
              <PhoneScene />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

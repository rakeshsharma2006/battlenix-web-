import {
  ClipboardCheck,
  Gamepad2,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { Reveal } from "@/components/motion/Reveal";
import { Atmosphere } from "@/components/motion/Atmosphere";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Create or Join a Team",
    description: "Set up a squad or find one in the app.",
  },
  {
    number: "02",
    icon: Search,
    title: "Find a Tournament",
    description: "Review tournament details and event rules.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Register",
    description: "Follow the registration steps shown in the app.",
  },
  {
    number: "04",
    icon: Gamepad2,
    title: "Play Your Match",
    description: "Check match details and follow the event flow.",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Results & Rewards",
    description: "Review standings and any eligible event rewards.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative isolate overflow-clip py-16 sm:py-20" aria-labelledby="how-it-works-heading">
      <Atmosphere variant="section" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From team sign-up to tournament results."
            description="A five-step overview of the player flow in BattleNix."
          />
        </Reveal>

        <div className="mt-10"><Timeline steps={steps.map(({ number, icon: Icon, ...step }) => ({ ...step, number, icon: <Icon className="h-4 w-4" aria-hidden="true" /> }))} /></div>
      </Container>
    </section>
  );
}

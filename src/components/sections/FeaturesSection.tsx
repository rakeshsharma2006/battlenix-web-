import {
  ChartColumn,
  CircleDashed,
  ShieldCheck,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Atmosphere } from "@/components/motion/Atmosphere";

const features = [
  {
    icon: <Swords className="h-5 w-5" />,
    title: "Competitive Tournaments",
    description: "Find BGMI and Free Fire tournaments in the app.",
  },
  {
    icon: <UsersIcon />,
    title: "Team-Based Competition",
    description: "Create or join squads using the app's team controls.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Real-Time Match Updates",
    description: "Follow tournament activity and result updates in the app.",
  },
  {
    icon: <ChartColumn className="h-5 w-5" />,
    title: "Results & Rankings",
    description: "Review available standings and match outcomes.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Secure Payment Flow",
    description: "Use the in-app payment flow when an event requires an entry fee.",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Rewards / Prize Tracking",
    description: "Check event details and the app for prize information.",
  },
];

function UsersIcon() {
  return <CircleDashed className="h-5 w-5" />;
}

export function FeaturesSection() {
  return (
    <section className="relative isolate overflow-clip py-16 sm:py-20" aria-labelledby="features-heading">
      <Atmosphere variant="section" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why BattleNix"
            title="A focused esports experience built around the games players actually queue for."
            description="BattleNix keeps the experience direct: team registration, match visibility, and clear tournament updates without extra noise."
          />
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.slice(0, 2).map(({ icon, title, description }, index) => (
            <FeatureCard
              key={title}
              icon={icon}
              number={`0${index + 1}`}
              title={title}
              description={description}
              featured
            />
          ))}
        </RevealGroup>
        <RevealGroup className="mt-4 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
          {features.slice(2).map(({ icon, title, description }, index) => (
            <FeatureCard key={title} icon={icon} number={`0${index + 3}`} title={title} description={description} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

import { ClipboardCheck, Gamepad2, Search, ShieldCheck, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { PLAY_STORE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "BattleNix How It Works",
  description: "Learn how to create an account, join a team, choose a tournament, register, play matches, review results, and follow event stages in BattleNix.",
  path: "/how-it-works",
});

const steps = [
  { number: "01", title: "Create Your Account", description: "Use the account options shown in the BattleNix app.", icon: <Users className="h-4 w-4" /> },
  { number: "02", title: "Create or Join a Team", description: "Use the team controls to create or join a squad.", icon: <Users className="h-4 w-4" /> },
  { number: "03", title: "Choose a Tournament", description: "Review the event details, rules, and availability.", icon: <Search className="h-4 w-4" /> },
  { number: "04", title: "Complete Registration", description: "Follow the registration and any applicable payment steps.", icon: <ClipboardCheck className="h-4 w-4" /> },
  { number: "05", title: "Play Your Match", description: "Check the app for match details and any event check-in steps.", icon: <Gamepad2 className="h-4 w-4" /> },
  { number: "06", title: "Check Results", description: "Review results and standings when available in the app.", icon: <Trophy className="h-4 w-4" /> },
  { number: "07", title: "Advance Through Stages", description: "Follow group, match, qualification, and final stages as shown for the event.", icon: <ShieldCheck className="h-4 w-4" /> },
  { number: "08", title: "Receive Eligible Rewards", description: "Check the event details and app for prize status and eligibility.", icon: <Trophy className="h-4 w-4" /> },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <PageHeader eyebrow="Player guide" title="How BattleNix Works" description="Follow your tournament journey from creating a team to checking results and eligible rewards." />
          <div className="mt-8"><Timeline steps={steps} layout="vertical" /></div>
          <div className="mt-8"><Button href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">Download App</Button></div>
        </Container>
      </section>
    </>
  );
}

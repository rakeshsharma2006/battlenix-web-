import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { fairPlayContent } from "@/content/legal/fair-play";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "BattleNix Fair Play Policy", description: fairPlayContent.description, path: "/fair-play" });

export default function FairPlayPage() {
  return (
    <LegalPageLayout
      title={fairPlayContent.title}
      path="/fair-play"
      intro="BattleNix expects all players and teams to compete fairly. This policy describes the platform’s approach to cheating, exploitation, collusion, abuse, and enforcement actions."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={fairPlayContent.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
      }))}
    />
  );
}

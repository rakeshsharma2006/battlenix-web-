import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { privacyContent } from "@/content/legal/privacy";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "BattleNix Privacy Policy", description: privacyContent.description, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={privacyContent.title}
      path="/privacy"
      intro="This Privacy Policy explains the account, team, gaming, and transaction information BattleNix may process to support tournaments, app access, support workflows, and platform operations."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={privacyContent.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
      }))}
    />
  );
}

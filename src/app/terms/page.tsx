import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { termsContent } from "@/content/legal/terms";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "BattleNix Terms & Conditions", description: termsContent.description, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={termsContent.title}
      path="/terms"
      intro="These Terms govern the way users access BattleNix, join teams, register for tournaments, participate in matches, and manage wallet or support workflows on the platform."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={termsContent.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
      }))}
    />
  );
}

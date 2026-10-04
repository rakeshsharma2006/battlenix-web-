import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { refundContent } from "@/content/legal/refund-policy";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "BattleNix Refund & Cancellation Policy", description: refundContent.description, path: "/refund-policy" });

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title={refundContent.title}
      path="/refund-policy"
      intro="This policy explains how BattleNix reviews payment problems, tournament cancellations, withdrawal questions, and support requests related to fees and refunds."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={refundContent.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
      }))}
    />
  );
}

import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { deleteAccountContent } from "@/content/legal/delete-account";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "BattleNix Account Deletion", description: deleteAccountContent.description, path: "/delete-account" });

export default function DeleteAccountPage() {
  return (
    <LegalPageLayout
      title={deleteAccountContent.title}
      path="/delete-account"
      intro="This page explains how account deletion works on BattleNix, what may be retained, and what users should review before making a deletion request."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={deleteAccountContent.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content,
      }))}
    />
  );
}

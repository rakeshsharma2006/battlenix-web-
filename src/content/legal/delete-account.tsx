import Link from "next/link";
import type { ReactNode } from "react";
import { LegalCallout } from "@/components/legal/LegalCallout";
import { DeleteRequestSlot } from "@/components/legal/DeleteRequestSlot";

// Draft content — must be reviewed by qualified legal counsel before launch.

export const deleteAccountContent = {
  title: "Delete Account",
  description:
    "BattleNix account deletion information including what is removed, what may be retained, and how to request deletion through verified account channels.",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      content: (
        <>
          <p>
            BattleNix supports account deletion requests where the platform provides a deletion flow or
            when a user requests support through the app or the published support channels.
          </p>
          <p>
            Account deletion is designed to permanently remove the account from active platform use,
            subject to legal, security, or operational exceptions described below.
          </p>
        </>
      ),
    },
    {
      id: "what-gets-deleted",
      title: "2. What May Be Deleted",
      content: (
        <>
          <p>
            If deletion is available for your account, profile and account information may be removed or anonymized. The exact fields and handling depend on the implemented account process and applicable requirements.
          </p>
        </>
      ),
    },
    {
      id: "what-may-be-retained",
      title: "3. What May Be Retained",
      content: (
        <>
          <p>
            BattleNix may retain limited records where required for legal compliance, security,
            fraud prevention, payment investigation, account integrity, or accounting and dispute
            handling. This retention may apply even after an account is deleted.
          </p>
          <p>
            Retention decisions depend on the data category, platform needs, and applicable legal or
            support obligations.
          </p>
        </>
      ),
    },
    {
      id: "before-you-request-deletion",
      title: "4. Active Participation",
      content: (
        <>
          <p>
            Active tournament participation, wallet balances, pending withdrawals, or team ownership can affect whether an account request can proceed. Review the applicable event information and use the support options in the app for account-specific guidance.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Review any wallet balance or pending transaction</li>
            <li>Check active tournament participation</li>
            <li>Review team ownership and membership</li>
          </ul>
        </>
      ),
    },
    {
      id: "how-requests-are-verified",
      title: "5. How Requests Are Verified",
      content: (
        <>
          <p>
            A request must be made through an account-controlled support flow and verified as belonging to the account holder. A request sent using an email address, username, or user ID alone is not sufficient.
          </p>
          <LegalCallout title="Note" tone="info">
            Never include your password, one-time passcode, or other login secret in a support message.
          </LegalCallout>
        </>
      ),
    },
    {
      id: "how-to-request-deletion",
      title: "6. How to Request Deletion",
      content: (
        <>
          <p>Use the account deletion instructions and support option available in the BattleNix app.</p>
          <DeleteRequestSlot />
          <div className="mt-3">
            <Link href="/contact" className="text-white underline decoration-[#e5484d] underline-offset-4">
              View Contact options
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "what-happens-next",
      title: "7. What Happens Next",
      content: (
        <>
          <p>
            Once a request is reviewed, the platform may process the deletion request, restrict the
            account, or require additional verification before completion. There is no guaranteed
            timeline stated in these pages for account deletion processing.
          </p>
        </>
      ),
    },
    {
      id: "support-contact",
      title: "8. Contact",
      content: (
        <>
          <p>
            If you need help with an account deletion request, contact the support route published by
            BattleNix or use the Contact page for the current channels.
          </p>
          <Link href="/contact" className="text-white underline decoration-[#e5484d] underline-offset-4">
            Contact BattleNix support
          </Link>
        </>
      ),
    },
  ],
} satisfies {
  title: string;
  description: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

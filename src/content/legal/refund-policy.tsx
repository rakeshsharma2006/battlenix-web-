import Link from "next/link";
import type { ReactNode } from "react";
import { LegalCallout } from "@/components/legal/LegalCallout";

// Draft content — must be reviewed by qualified legal counsel before launch.

export const refundContent = {
  title: "Refund & Cancellation Policy",
  description:
    "BattleNix policy for payment disputes, failed transactions, tournament cancellations, match disruption, and support steps for refund-related queries.",
  sections: [
    {
      id: "successful-registration",
      title: "1. Successful Registration",
      content: (
        <p>For a completed registration, refer to the refund information shown for the event and in the app before payment. If the applicable terms are unclear, contact support before taking further action.</p>
      ),
    },
    {
      id: "failed-payment",
      title: "2. Failed Payment",
      content: (
        <>
          <p>Check the payment and registration status shown in the app. If the status is unclear or does not match your payment record, contact support with the transaction reference.</p>
        </>
      ),
    },
    {
      id: "duplicate-payment",
      title: "3. Duplicate Payment",
      content: (
        <>
          <p>If you believe you made a duplicate payment, contact support with the transaction references so the records can be reviewed.</p>
        </>
      ),
    },
    {
      id: "tournament-cancellation",
      title: "4. Tournament Cancellation",
      content: (
        <>
          <p>For a cancelled event, review the event notice and the payment information shown in the app. Contact support if you need clarification about a specific transaction.</p>
        </>
      ),
    },
    {
      id: "match-cancellation",
      title: "5. Match Cancellation",
      content: (
        <>
          <p>For a cancelled or disrupted match, follow the event notice in the app and contact support if you need help understanding how the change affects your registration.</p>
        </>
      ),
    },
    {
      id: "technical-failure",
      title: "6. Technical Failure",
      content: (
        <>
          <p>If a technical issue affects registration or participation, contact support with the event name and relevant details. Any review depends on the information available for that case.</p>
        </>
      ),
    },
    {
      id: "disqualification",
      title: "7. Disqualification",
      content: (
        <>
          <p>Disqualification and any payment consequences are governed by the relevant event rules and applicable platform policies. Review those terms for the specific event.</p>
        </>
      ),
    },
    {
      id: "payment-reversal",
      title: "8. Payment Reversal",
      content: (
        <>
          <p>For a payment reversal, check the status shown by the payment provider and in the app. No processing timeline is stated on this page.</p>
        </>
      ),
    },
    {
      id: "withdrawal-issues",
      title: "9. Withdrawal Issues",
      content: (
        <>
          <p>For a withdrawal or balance issue, check the wallet status in the app and contact support with the relevant transaction details.</p>
        </>
      ),
    },
    {
      id: "refund-processing",
      title: "10. Refund Processing",
      content: (
        <>
          <p>Any refund review and processing depend on the relevant event terms, payment status, and provider flow. This policy does not promise a processing timeline.</p>
        </>
      ),
    },
    {
      id: "non-refundable-cases",
      title: "11. Non-Refundable Cases",
      content: (
        <>
          <p>Whether a payment is refundable depends on the terms for the relevant event and transaction. Review those terms in the app; this page does not add a universal list of non-refundable cases.</p>
        </>
      ),
    },
    {
      id: "support",
      title: "12. Support",
      content: (
        <>
          <LegalCallout title="What to include when contacting support" tone="info">
            <ul className="list-disc space-y-1 pl-5">
              <li>Transaction ID or payment reference</li>
              <li>Registered phone number or email</li>
              <li>Tournament name</li>
              <li>Screenshot or reference details where available</li>
            </ul>
          </LegalCallout>
          <p>
            For support requests, please use the Contact page or the in-app support channel. We will
            review the issue and update you through the available communication route.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-[#26262c] px-3 py-2 text-zinc-200 hover:text-white">
              Contact us
            </Link>
            <Link href="/help" className="inline-flex min-h-11 items-center rounded-lg border border-[#26262c] px-3 py-2 text-zinc-200 hover:text-white">
              Help Center
            </Link>
          </div>
        </>
      ),
    },
  ],
} satisfies {
  title: string;
  description: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

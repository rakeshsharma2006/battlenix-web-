import Link from "next/link";
import type { ReactNode } from "react";
import { getConfigValue, SITE_CONFIG } from "@/lib/site-config";

// Draft content — must be reviewed by qualified legal counsel before launch.

export const termsContent = {
  title: "Terms & Conditions",
  description: "Review BattleNix terms for accounts, teams, tournament participation, payments, fair play, and app use. Event details appear in the app.",
  sections: [
    { id: "acceptance", title: "1. Acceptance", content: <p>These Terms apply to use of BattleNix and its available app, website, team, and tournament features. Event-specific rules may also apply.</p> },
    { id: "eligibility", title: "2. Eligibility", content: <p>Eligibility depends on the platform and event requirements. The current age policy is: {getConfigValue(SITE_CONFIG.eligibility, "[AGE POLICY]", "not specified on this page")}.</p> },
    { id: "account", title: "3. Account", content: <p>Use the account options in the app and provide accurate information where requested. Protect your sign-in credentials and account access.</p> },
    { id: "one-account-policy", title: "4. One Account Policy", content: <p>Review the account rules and Fair Play Policy before participating. Multiple accounts used to bypass platform or event rules may be reviewed.</p> },
    { id: "team-membership", title: "5. Team Membership", content: <p>Teams and membership are managed using the options available in the app. Team participation is subject to the relevant event rules.</p> },
    { id: "tournament-registration", title: "6. Tournament Registration", content: <p>Registration depends on the event details, eligibility requirements, available places, and any required steps shown in the app.</p> },
    { id: "entry-fees", title: "7. Entry Fees", content: <p>If an event has an entry fee, the amount and payment step are displayed in the app before registration is completed.</p> },
    { id: "match-check-in", title: "8. Match / Check-in", content: <p>Follow match and check-in instructions shown for the event. Requirements can vary between tournaments.</p> },
    { id: "results-scoring", title: "9. Results & Scoring", content: <p>Results and scoring follow the rules published for the relevant event. Check the app for event-specific information and updates.</p> },
    { id: "qualification", title: "10. Qualification", content: <p>Qualification and elimination depend on the event structure, standings, and applicable rules shown in the app.</p> },
    { id: "prize-distribution", title: "11. Prize Distribution", content: <p>Prize details, eligibility, and distribution information are event-specific. Review the published details in the app.</p> },
    { id: "wallet-withdrawals", title: "12. Wallet & Withdrawals", content: <p>Wallet and withdrawal features are subject to the app flow and relevant platform checks. Check the wallet view and applicable policies for current information.</p> },
    { id: "refunds", title: "13. Refunds", content: <p>Payment and cancellation information is described in the <Link href="/refund-policy" className="text-white underline decoration-[#e5484d] underline-offset-4">Refund & Cancellation Policy</Link> and the applicable event details.</p> },
    { id: "fair-play", title: "14. Fair Play", content: <p>Players and teams are expected to follow event rules and the <Link href="/fair-play" className="text-white underline decoration-[#e5484d] underline-offset-4">Fair Play Policy</Link>.</p> },
    { id: "suspension", title: "15. Suspension", content: <p>Access or event participation may be restricted where platform rules, security review, or event requirements call for action. Refer to the Fair Play Policy.</p> },
    { id: "user-content", title: "16. User Content", content: <p>Users are responsible for information and content they submit through their account, team, or support features.</p> },
    { id: "third-party-games", title: "17. Third-Party Games", content: <p>BGMI and Free Fire are third-party games. BattleNix is not affiliated with or endorsed by Krafton or Garena. Game ownership and publisher rules remain with their respective owners.</p> },
    { id: "intellectual-property", title: "18. IP", content: <p>BattleNix branding and website materials are associated with the BattleNix service. Third-party names and marks belong to their respective owners.</p> },
    { id: "service-availability", title: "19. Service Availability", content: <p>App and website features may be unavailable or change. Tournament-specific notices and current app information should be checked before participation.</p> },
    { id: "liability", title: "20. Liability", content: <p>This section is a draft and requires qualified legal review. Applicable rights and obligations depend on the relevant law and circumstances.</p> },
    { id: "dispute-resolution", title: "21. Dispute Resolution", content: <p>Any jurisdiction or dispute process requires owner and legal confirmation: {getConfigValue(SITE_CONFIG.jurisdiction, "[JURISDICTION]", "not specified on this page")}.</p> },
    { id: "changes", title: "22. Changes", content: <p>These Terms may be updated. The current version and last-updated date are published on this page.</p> },
    { id: "contact", title: "23. Contact", content: <p>For questions, use support options available in the app or the public <Link href="/contact" className="text-white underline decoration-[#e5484d] underline-offset-4">Contact page</Link>.</p> },
  ],
} satisfies {
  title: string;
  description: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

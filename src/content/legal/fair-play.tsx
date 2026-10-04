import type { ReactNode } from "react";
import { LegalCallout } from "@/components/legal/LegalCallout";
import { getConfigValue, SITE_CONFIG } from "@/lib/site-config";

// Draft content — must be reviewed by qualified legal counsel before launch.

export const fairPlayContent = {
  title: "Fair Play Policy",
  description: "BattleNix Fair Play Policy for tournament conduct, account integrity, evidence review, prize eligibility, and support. Review event rules in the app.",
  sections: [
    {
      id: "quick-summary",
      title: "Quick summary",
      content: <LegalCallout title="Quick summary" tone="info">Compete fairly and follow the event rules. Report concerns using the support options in the app.</LegalCallout>,
    },
    { id: "purpose", title: "1. Purpose", content: <p>This policy describes fair participation expectations for BattleNix tournaments and platform use.</p> },
    { id: "cheating", title: "2. Cheating", content: <p>Cheating includes attempts to gain an unfair advantage or affect event outcomes in a way that conflicts with the event rules.</p> },
    { id: "unauthorized-software", title: "3. Unauthorized Software", content: <p>Do not use unauthorized software or tools to affect fair competition, match outcomes, or platform operation.</p> },
    { id: "exploits", title: "4. Exploits", content: <p>Do not exploit game, match, or platform issues to gain an unfair advantage. Report issues through support.</p> },
    { id: "collusion", title: "5. Collusion", content: <p>Secret coordination or cooperation intended to manipulate an event or its results may be reviewed under this policy.</p> },
    { id: "match-manipulation", title: "6. Match Manipulation", content: <p>Attempts to manipulate scores, results, or tournament progression may be reviewed against available event information.</p> },
    { id: "multi-account-abuse", title: "7. Multi-Account Abuse", content: <p>Do not use multiple accounts to evade restrictions, bypass event rules, or manipulate participation or referral features.</p> },
    { id: "fraud", title: "8. Fraud", content: <p>False or deceptive account, registration, or payment activity may be reviewed under the applicable platform rules.</p> },
    { id: "referral-abuse", title: "9. Referral Abuse", content: <p>Referral features must not be used with fake activity or other behavior intended to manipulate attribution or rewards.</p> },
    { id: "evidence", title: "10. Evidence", content: <p>BattleNix may review information available through relevant match, account, team, payment, and support records. Users may provide relevant screenshots or details through support.</p> },
    { id: "investigations", title: "11. Investigations", content: <p>Concerns may be reviewed using available information. Additional details may be requested through the support process.</p> },
    { id: "temporary-suspension", title: "12. Temporary Suspension", content: <p>Participation or account access may be temporarily restricted while a concern is reviewed where platform rules permit.</p> },
    { id: "permanent-ban", title: "13. Permanent Ban", content: <p>Serious or repeated violations may result in a permanent restriction where permitted by the platform rules and applicable review.</p> },
    { id: "prize-eligibility", title: "14. Prize Eligibility", content: <p>Prize eligibility is subject to the relevant event rules, results, and any applicable review. Check the event information in the app.</p> },
    { id: "appeals", title: "15. Appeals", content: <p>For questions about an enforcement action, use the support channel available in the app. Appeal contact: {getConfigValue(SITE_CONFIG.appealContact, "[SUPPORT EMAIL]", "in-app support")}.</p> },
    { id: "contact", title: "16. Contact", content: <p>To report a fair play concern, use the in-app support options or the public Contact page.</p> },
  ],
} satisfies {
  title: string;
  description: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

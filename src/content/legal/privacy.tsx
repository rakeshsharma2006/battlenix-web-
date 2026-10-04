import Link from "next/link";
import type { ReactNode } from "react";
import { LegalCallout } from "@/components/legal/LegalCallout";
import { SITE_CONFIG, getConfigValue } from "@/lib/site-config";

// Draft content — must be reviewed by qualified legal counsel before launch.

export const privacyContent = {
  title: "Privacy Policy",
  description:
    "BattleNix privacy policy covering account data, gaming and team data, transaction information, device data, and platform support practices.",
  sections: [
    {
      id: "who-we-are",
      title: "1. Who We Are",
      content: (
        <>
          <p>
            BattleNix is a platform focused on BGMI and Free Fire tournament participation,
            registration, and result tracking. We process data so users can create accounts,
            manage teams, join events, monitor status, and receive relevant platform updates.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <p>
            We may collect information needed to operate the platform, including account profile
            details, in-game identifiers, team membership information, tournament participation data,
            payment status and transaction metadata, device or technical information, and push
            notification identifiers where applicable.
          </p>
        </>
      ),
    },
    {
      id: "account-data",
      title: "3. Account Data",
      content: (
        <>
          <p>
            BattleNix may collect account identifiers, profile details, contact details, and user
            preferences that are necessary to set up access, manage team membership, and support
            tournament participation.
          </p>
          <p>
            Account information should be kept accurate so the platform can deliver the correct team,
            tournament, wallet, and support experience.
          </p>
        </>
      ),
    },
    {
      id: "gaming-data",
      title: "4. Gaming Data",
      content: (
        <>
          <p>
            BattleNix may process game-related information such as user identifiers, profile names,
            tournament participation, qualifying data, team assignment details, match registration,
            results, and related status updates for BGMI and Free Fire events.
          </p>
          <p>
            This information supports tournament operations, leaderboard tracking, and the
            event-specific experience within the app.
          </p>
        </>
      ),
    },
    {
      id: "team-data",
      title: "5. Team Data",
      content: (
        <>
          <p>
            Team information may include team name, membership status, role, roster information,
            registration details, and match participation status for active or completed events.
          </p>
          <p>
            Team data may be shared internally within the platform to support scheduling,
            tournament access, and verification, where applicable.
          </p>
        </>
      ),
    },
    {
      id: "payment-transaction-data",
      title: "6. Payment / Transaction Data",
      content: (
        <>
          <p>
            BattleNix may process payment and transaction metadata required for tournament entry,
            wallet activity, or related platform operations. This may include transaction status,
            payment method type, amount, order references, and payout or refund-related metadata.
          </p>
          <p>
            Payment credential handling depends on the payment flow and provider. Review the information presented during payment for provider-specific details.
          </p>
        </>
      ),
    },
    {
      id: "device-technical-data",
      title: "7. Device / Technical Data",
      content: (
        <>
          <p>
            We may collect device, app, or technical information such as operating system details,
            app version, network information, crash or error analytics, and related event metadata
            necessary to improve stability and support the platform.
          </p>
        </>
      ),
    },
    {
      id: "push-notification-fcm-data",
      title: "8. Push Notification / FCM Data",
      content: (
        <>
          <p>
            Where push notifications are enabled, BattleNix may use a device token or equivalent
            notification identifier to deliver alerts related to match updates, tournament status,
            wallet updates, and account messages.
          </p>
          <p>
            Users can manage notification preferences in the app or device settings where available.
          </p>
        </>
      ),
    },
    {
      id: "referral-attribution-data",
      title: "9. Referral Attribution Data",
      content: (
        <>
          <p>
            Where referral or attribution features are enabled, BattleNix may process source,
            campaign, or attribution data to understand how a user arrived or how certain platform
            activities are connected to a referral flow.
          </p>
          <p>
            Referral information may be used for internal analytics, verification, and feature
            enforcement where the flow is available.
          </p>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "10. How We Use Information",
      content: (
        <>
          <p>
            We use personal and platform information to create and manage accounts, support team and
            tournament workflows, process registration and wallet activity, review results, deliver
            notifications, and provide support where needed.
          </p>
          <p>
            Information may also be used to maintain platform integrity, enforce rules, prevent
            misuse, and improve performance and reliability for the app and website experience.
          </p>
        </>
      ),
    },
    {
      id: "how-information-is-shared",
      title: "11. How Information Is Shared",
      content: (
        <>
          <p>
            BattleNix may share information internally with teams, tournament systems, support
              Read the Account Deletion page
          </p>
          <p>
            We may also share information with third parties where required for legal compliance,
            platform security, account investigation, payment processing, or support-related
            workflows.
          </p>
        </>
      ),
    },
    {
      id: "payment-providers",
      title: "12. Payment Providers",
      content: (
        <p>
          Payments may be processed by a third-party provider selected for the payment flow. Provider information and terms should be reviewed in the payment experience. BattleNix does not state here that it stores or does not store payment credentials.
        </p>
      ),
    },
    {
      id: "public-tournament-information",
      title: "13. Public Tournament Information",
      content: (
        <p>
          Tournament participation can include team, player, group, match, and result information visible to other participants or on tournament views. Review the app and event details for the information displayed for a specific tournament.
        </p>
      ),
    },
    {
      id: "data-security",
      title: "14. Data Security",
      content: (
        <p>
          BattleNix uses administrative, technical, and operational measures intended to protect account and platform data. No system can guarantee absolute security. Users should protect their credentials and device access.
        </p>
      ),
    },
    {
      id: "data-retention",
      title: "15. Data Retention",
      content: (
        <p>
          Data retention depends on its purpose and applicable operational, security, and legal requirements. No specific retention duration is stated here; current details require owner and legal review.
        </p>
      ),
    },
    {
      id: "account-deletion",
      title: "16. Account Deletion",
      content: (
        <>
          <p>See the Account Deletion page for current static instructions and information about verification and possible record retention.</p>
          <Link href="/delete-account" className="text-white underline decoration-[#e5484d] underline-offset-4">Read the Account Deletion page</Link>
        </>
      ),
    },
    {
      id: "childrens-privacy",
      title: "17. Children’s Privacy",
      content: (
        <p>
          Age requirements and rules for younger users: {getConfigValue(SITE_CONFIG.eligibility, "[AGE POLICY]", "require owner and legal confirmation")}.
        </p>
      ),
    },
    {
      id: "third-party-services",
      title: "18. Third-Party Services",
      content: (
        <>
          <p>BattleNix may rely on third-party services for platform operations. The production provider list must be confirmed before publication.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Push notifications: {getConfigValue(SITE_CONFIG.pushProvider, "[PUSH PROVIDER]", "provider not specified")}</li>
            <li>Hosting: {getConfigValue(SITE_CONFIG.hostingProvider, "[HOSTING PROVIDER]", "provider not specified")}</li>
            <li>Analytics and troubleshooting: {getConfigValue(SITE_CONFIG.analyticsProvider, "[ANALYTICS PROVIDER]", "provider not specified")}</li>
          </ul>
          <p>BGMI and Free Fire are third-party games and are not owned by BattleNix.</p>
        </>
      ),
    },
    {
      id: "user-requests",
      title: "19. User Requests",
      content: (
        <p>Users may submit privacy or account requests through the support options available in the app. BattleNix may request verification to help protect account information.</p>
      ),
    },
    {
      id: "policy-changes",
      title: "20. Changes",
      content: (
        <p>This Privacy Policy may be revised to reflect changes in the platform or applicable requirements. The last-updated date appears at the top of this page.</p>
      ),
    },
    {
      id: "contact",
      title: "21. Contact",
      content: (
        <>
          <p>For privacy questions, use {getConfigValue(SITE_CONFIG.privacyEmail, "[PRIVACY EMAIL]", "in-app support")} or the public Contact page.</p>
          <LegalCallout title="Note" tone="info">Do not include passwords, OTPs, or other login secrets in support messages.</LegalCallout>
        </>
      ),
    },
  ],
} satisfies {
  title: string;
  description: string;
  sections: Array<{ id: string; title: string; content: ReactNode }>;
};

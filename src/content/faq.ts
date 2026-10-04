export type FAQItemData = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  title: string;
  items: FAQItemData[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "account",
    title: "Account",
    items: [
      { question: "How do I create a BattleNix account?", answer: "Use the account creation options shown in the BattleNix app and follow its verification steps." },
      { question: "Can I have multiple accounts?", answer: "Review the One Account Policy in the Terms & Conditions for the current account rules." },
      { question: "How do I update my profile?", answer: "Open your profile in the app and use the available profile editing controls. Available fields may depend on your account." },
      { question: "How do I delete my account?", answer: "See the Account Deletion page for the current instructions. Requests must be verified through an account-controlled support flow." },
    ],
  },
  {
    id: "teams",
    title: "Teams",
    items: [
      { question: "How do I create a team?", answer: "Use the team controls in the app and follow the prompts shown there." },
      { question: "How do I join a team?", answer: "Use the available team search, invite, or join-request options in the app." },
      { question: "Who can register a team for a tournament?", answer: "The registration controls and event rules shown in the app determine who can submit a team." },
      { question: "How does Team Leader registration work?", answer: "The team leader should review the tournament's registration details in the app. Roster and payment steps can vary by event." },
    ],
  },
  {
    id: "tournaments",
    title: "Tournaments",
    items: [
      { question: "How do tournaments work?", answer: "Tournament pages in the app show the event details and available steps, which may include registration, groups, matches, and results." },
      { question: "How are teams allocated to groups?", answer: "Group details are shown on the relevant tournament page in the app. Allocation details may vary by event." },
      { question: "What is check-in?", answer: "Check-in is an event-specific confirmation step when one is required. Follow the instructions and availability shown in the app." },
      { question: "How are room credentials shared?", answer: "When room details are provided for a match, use the match view in the app and follow its access instructions." },
      { question: "How are results calculated?", answer: "The applicable scoring and result details are defined for each event and shown in the app." },
      { question: "How does qualification work?", answer: "Qualification depends on the tournament's stages and standings. Check the tournament details in the app." },
      { question: "What happens after elimination?", answer: "Your event status and any further steps are shown in the app. Review the tournament rules for event-specific details." },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      { question: "How do I pay tournament entry fees?", answer: "If an entry fee applies, use the payment flow provided in the app and check the event details before confirming." },
      { question: "What happens if payment fails?", answer: "Check the payment status in the app. If the status does not resolve, use the support options available in the app or Contact page." },
      { question: "How are payment confirmations handled?", answer: "Use the transaction status displayed in the app as the source for your registration. Contact support if it appears inconsistent." },
      { question: "What happens to a cancelled tournament?", answer: "See the Refund & Cancellation Policy and the event notices in the app; treatment depends on the event and payment status." },
    ],
  },
  {
    id: "prizes",
    title: "Prizes",
    items: [
      { question: "How are prizes distributed?", answer: "Prize eligibility and distribution are described in each tournament's details and the applicable policy." },
      { question: "Where is the tournament prize credited?", answer: "Check the app's wallet and event details for the current prize status. The payout method may depend on the event." },
      { question: "Can prizes be split between team members?", answer: "Prize allocation depends on the event's published prize details. Review those details in the app before participating." },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      { question: "How do I contact support?", answer: "Use in-app support or any contact channel listed on the Contact page." },
      { question: "How do I report cheating?", answer: "Use the reporting or support options available in the app and include relevant match details. See the Fair Play Policy." },
      { question: "How do I request account deletion?", answer: "See the Account Deletion page. A request must be made through the verified account flow, not by email or user ID alone." },
    ],
  },
];

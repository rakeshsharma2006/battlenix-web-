import { SITE_CONFIG } from "@/lib/site-config";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.battlenix.esports";

export const SITE_URL =
  "https://battlenix.in";

export const LEGAL_LAST_UPDATED = SITE_CONFIG.legalLastUpdated;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/fair-play", label: "Fair Play Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/delete-account", label: "Delete Account" },
];

export const FOOTER_LINKS = {
  explore: [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/faq", label: "FAQ" },
  ],
  support: [
    { href: "/contact", label: "Contact" },
    { href: "/help", label: "Help Center" },
  ],
  legal: LEGAL_LINKS,
};

export const MOBILE_EXTRA_LINKS = [
  { href: "/about", label: "About" },
];

export const SOCIAL_LINKS = SITE_CONFIG.socialLinks;
export const CONTACT = SITE_CONFIG.contact;

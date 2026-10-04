export type SocialLinkKey = "instagram" | "youtube";

export type ContactMap = {
  email: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
};

export type SiteConfig = {
  legalLastUpdated: string;
  publicLocation: string;
  legalBusinessName: string | null;
  businessAddress: string | null;
  privacyEmail: string | null;
  eligibility: string | null;
  jurisdiction: string | null;
  supportEmail: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
  paymentProvider: string | null;
  pushProvider: string | null;
  hostingProvider: string | null;
  analyticsProvider: string | null;
  retention: string | null;
  appealContact: string | null;
  refundContact: string | null;
  socialLinks: Record<SocialLinkKey, string | null>;
  contact: ContactMap;
};

export const SITE_CONFIG: SiteConfig = {
  legalLastUpdated: "2026-10-03",
  publicLocation: "Kannauj, Uttar Pradesh, India",
  // TODO(owner): Confirm legal business identity and public contact details before launch.
  legalBusinessName: null,
  businessAddress: null,
  privacyEmail: null,
  eligibility: null,
  jurisdiction: null,
  supportEmail: null,
  whatsapp: "https://whatsapp.com/channel/0029VbDyGYcCxoAuvQF9VI1r",
  telegram: null,
  instagram: "https://www.instagram.com/battlenix",
  youtube: "https://youtube.com/@battlenix-in",
  paymentProvider: null,
  pushProvider: null,
  hostingProvider: null,
  analyticsProvider: null,
  retention: null,
  appealContact: null,
  refundContact: null,
  socialLinks: {
    instagram: "https://www.instagram.com/battlenix",
    youtube: "https://youtube.com/@battlenix-in",
  },
  contact: {
    email: null,
    whatsapp: "https://whatsapp.com/channel/0029VbDyGYcCxoAuvQF9VI1r",
    telegram: null,
    instagram: "https://www.instagram.com/battlenix",
    youtube: "https://youtube.com/@battlenix-in",
  },
};

export function getConfigValue(
  value: string | null,
  developmentFallback = "[TO BE CONFIRMED]",
  productionFallback = "not provided on this page",
) {
  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === "production") {
    return productionFallback;
  }

  return developmentFallback;
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

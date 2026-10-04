import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const pageTitle = title.startsWith("BattleNix") ? title : `BattleNix ${title}`;

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      siteName: "BattleNix",
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BattleNix" }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
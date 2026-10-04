import type { MetadataRoute } from "next";
import { FOOTER_LINKS, LEGAL_LAST_UPDATED, MOBILE_EXTRA_LINKS, NAV_LINKS, SITE_URL } from "@/lib/constants";

const legalRoutes = new Set(FOOTER_LINKS.legal.map(({ href }) => href));
const routes = Array.from(new Set([
  ...NAV_LINKS.map(({ href }) => href),
  ...FOOTER_LINKS.explore.map(({ href }) => href),
  ...FOOTER_LINKS.support.map(({ href }) => href),
  ...FOOTER_LINKS.legal.map(({ href }) => href),
  ...MOBILE_EXTRA_LINKS.map(({ href }) => href),
  "/tournaments/demo-erangel-elite-cup",
]));

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: legalRoutes.has(route) ? new Date(LEGAL_LAST_UPDATED) : new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

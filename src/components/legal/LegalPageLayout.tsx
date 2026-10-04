import Link from "next/link";
import type { ReactNode } from "react";
import { LastUpdated } from "@/components/legal/LastUpdated";
import { LegalSection } from "@/components/legal/LegalSection";
import { LegalToc } from "@/components/legal/LegalToc";
import { SITE_URL } from "@/lib/constants";

type LegalSectionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSectionItem[];
  path: string;
  crumbLabel?: string;
};

export function LegalPageLayout({
  title,
  intro,
  lastUpdated,
  sections,
  path,
  crumbLabel = title,
}: LegalPageLayoutProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: crumbLabel, item: `${SITE_URL}${path}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article id="top" className="legal-print mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 print:max-w-none print:px-0">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-400 print:hidden">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span aria-current="page" className="text-zinc-200">{crumbLabel}</span>
        </nav>

        <header className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h1>
          <LastUpdated date={lastUpdated} />
          <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">{intro}</p>
        </header>

        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <aside className="mb-8 min-w-0 lg:mb-0 lg:pt-2 print:hidden">
            <div className="lg:hidden">
              <details className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <summary className="cursor-pointer list-none px-2 py-2 text-sm font-medium text-zinc-200">
                  Table of contents
                </summary>
                <div className="mt-3 pb-2">
                  <LegalToc sections={sections.map(({ id, title }) => ({ id, title }))} />
                </div>
              </details>
            </div>
            <div className="hidden lg:block lg:sticky lg:top-24">
              <LegalToc sections={sections.map(({ id, title }) => ({ id, title }))} />
            </div>
          </aside>

          <div className="min-w-0 max-w-[72ch]">
            {sections.map((section) => (
              <LegalSection key={section.id} id={section.id} title={section.title}>
                {section.content}
              </LegalSection>
            ))}

            <div className="mt-10 border-t border-[#26262c] pt-6 text-sm text-zinc-300 print:hidden">
              <a href="#top" className="hover:text-white">
                Back to top
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

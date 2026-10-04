"use client";

import { useEffect, useState } from "react";

type TocSection = {
  id: string;
  title: string;
};

type LegalTocProps = {
  sections: TocSection[];
};

export function LegalToc({ sections }: LegalTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((target): target is HTMLElement => target instanceof HTMLElement);
    if (typeof IntersectionObserver === "undefined" || targets.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="rounded-lg border border-[#26262c] bg-[#131316] p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
        Contents
      </p>
      <ul className="space-y-2 text-sm text-zinc-200">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={section.id === activeId ? "location" : undefined}
              className="legal-toc-link block rounded-md border-l-2 border-transparent px-2 py-1.5 text-sm transition-colors hover:bg-[#1a1a1f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

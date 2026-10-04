type TocSection = {
  id: string;
  title: string;
};

type LegalTocProps = {
  sections: TocSection[];
};

export function LegalToc({ sections }: LegalTocProps) {
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
              className="block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-[#1a1a1f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d]"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

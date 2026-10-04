import type { ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";

type LegalSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-[#26262c] py-6 print:break-inside-avoid">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        <a
          href={`#${id}`}
          aria-label={`Link to ${title}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] print:hidden"
        >
          <LinkIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="min-w-0 space-y-4 break-words text-base leading-7 text-zinc-200">{children}</div>
    </section>
  );
}

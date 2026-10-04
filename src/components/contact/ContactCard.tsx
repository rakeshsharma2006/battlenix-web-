import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export type ContactCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
  href: string;
};

export function ContactCard({
  icon,
  label,
  value,
  description,
  href,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="contact-card group flex h-full min-w-0 flex-col rounded-xl border border-[#26262c] bg-[#131316] p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5484d] md:p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="contact-icon flex h-12 w-12 items-center justify-center rounded-lg border border-[#26262c] bg-[#1a1a1f] text-[#e5484d]">
          {icon}
        </div>
        <ArrowUpRight className="card-cta-arrow h-4 w-4 text-zinc-400 group-hover:text-white" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">{label}</p>
      <p className="mt-2 break-words text-lg font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
    </a>
  );
}
